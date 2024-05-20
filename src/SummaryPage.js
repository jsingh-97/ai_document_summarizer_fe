import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';


function SummaryPage({ sessionId }) {
    const [summary, setSummary] = useState('');
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [fileName, setFileName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  const handleAskQuestion = async (event) => {
    event.preventDefault();
    if (!newQuestion || !sessionId) {
      console.log('Empty Question or session');
      return;
    }
    setIsLoading(true); 
    try {
      const response = await axios.get(`http://127.0.0.1:5001/ask?question=${newQuestion}`, {
        headers: { session: sessionId },
      });
      setQuestions([...questions, { question: newQuestion, answer: response.data.response }]);
      setNewQuestion('');
    } catch (error) {
      console.log(`Error while calling /ask api. Error: ${error}`);
    } finally{
        setIsLoading(false);
    }
  };

  const handleFileChange = async () => {
    const formData = new FormData();
    formData.append('file', fileName);
    setIsLoading(true);
    try {
      const response = await axios.post(`http://127.0.0.1:5001/summary`, formData, {
        headers: {
          session: sessionId,
        },
      });
      setSummary(response.data.summary);
    } catch (error) {
      console.log(`Error while calling /summary api. Error: ${error}`);
    } finally{
        setIsLoading(false);
    }
  };

  const handleInputFileChange = (event) => {
    setFileName(event.target.files[0]);
  };

return (
    <SummaryContainer>
      {summary ? (
        <>
          <SummaryHeader>Summary</SummaryHeader>
          <SummaryText>{summary}</SummaryText>
          <SummaryHeader>Questions & Answers</SummaryHeader>
          <QuestionList>
            {questions.map((qna) => (
              <QuestionListItem key={qna.question}>
                <QuestionLabel>You:</QuestionLabel>
                {qna.question}
                <br />
                <QuestionLabel>Assistant:</QuestionLabel>
                {qna.answer}
              </QuestionListItem>
            ))}
          </QuestionList>
        <AskQuestionForm onSubmit={handleAskQuestion}>
            <label htmlFor="newQuestion">Ask a question:</label>
            <AskQuestionInput type="text" id="newQuestion" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
            <AskQuestionButton type="submit">Ask</AskQuestionButton>
        </AskQuestionForm>
        </>
        ) : (
                <UploadSection>  {/* New styled component for upload section */}
                <SummaryText>Upload a PDF to get the summary.</SummaryText>
                <UploadInput type="file" onChange={handleInputFileChange} />
                <UploadButton onClick={handleFileChange}>Submit</UploadButton>
                </UploadSection>
            )
    }
    {isLoading && (
            <Loader >
                <p>We're crunching numbers (and text)! Your request is being processed.</p>
            </Loader>
    )}
        </SummaryContainer>
    )
}

const SummaryContainer = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
  background-color: #f5f5f5; /* Light gray background */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
`;

const SummaryHeader = styled.h2`
  margin: 1rem 0;
  font-size: 1.2rem; /* Slightly larger heading */
  font-weight: bold;
`;

const SummaryText = styled.p`
  margin-bottom: 1rem;
  line-height: 1.5; /* Improve readability */
`;

const QuestionList = styled.ul`
  padding: 0;
  list-style: none;
`;

const QuestionListItem = styled.li`
  margin-bottom: 1rem;
`;

const QuestionLabel = styled.b`
  margin-right: 0.5rem;
  font-weight: bold;
`;

const AskQuestionForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const AskQuestionInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

const AskQuestionButton = styled.button`
  padding: 0.75rem 1rem;
  background-color: #4CAF50; /* Green */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const UploadSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

const UploadInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
`;
const UploadButton = styled.button`
  padding: 0.75rem 1rem;
  background-color: #4CAF50; /* Green */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
`;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3); /* Semi-transparent black background */
  z-index: 999; /* Ensure loader is displayed above other content */
`;

export default SummaryPage;