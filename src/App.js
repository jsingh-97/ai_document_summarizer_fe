import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect} from 'react';
import WelcomePage from './WelcomePage';
import SummaryPage from './SummaryPage';
import axios from 'axios';

function App() {

  const [sessionId, setSessionId] = useState("");
  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
  }, []);    

  const handleSessionCreation = async (userId) => {
    try {
      const response = await axios.post(`http://127.0.0.1:5001/session?user_id=${userId}`);
      localStorage.setItem('sessionId', response.data.session_id);
      setSessionId(response.data.session_id);   
      return response
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage onSessionCreate={handleSessionCreation}/>} />
        <Route path="/summary" element={<SummaryPage sessionId={sessionId}/>} />
      </Routes>
    </Router>
  );
}

export default App;
