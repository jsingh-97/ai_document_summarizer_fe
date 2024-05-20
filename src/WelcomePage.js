import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const WelcomeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	background-color: #f5f5f5;
`;

const WelcomeTitle = styled.h1`
	font-size: 2em;
	margin-bottom: 2rem;
`;

const WelcomeForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const WelcomeLabel = styled.label`
	font-weight: bold;
`;

const WelcomeInput = styled.input`
	padding: 0.5rem;
	border: 1px solid #ccc;
	border-radius: 4px;
`;

const WelcomeButton = styled.button`
	padding: 0.75rem 1rem;
	background-color: #4caf50; /* Green */
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
`;
function WelcomePage({ onSessionCreate }) {
	const [userId, setUserId] = useState("");
	const navigate = useNavigate();
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await onSessionCreate(userId); // Call session creation function (assuming it returns a response)
			console.log(response);
			if (response.status === 200) {
				// Check for successful response
				console.log("Hey");
				navigate("/summary"); // Redirect to SummaryPage on success
			} else {
				console.log("error");
			}
		} catch (error) {
			console.error(error);
			// Handle errors here
		}
	};

	return (
		<WelcomeContainer>
			<WelcomeTitle>PDF Summarizer</WelcomeTitle>
			<WelcomeForm onSubmit={handleSubmit}>
				<WelcomeLabel htmlFor="userId">Enter User ID:</WelcomeLabel>
				<WelcomeInput
					type="text"
					id="userId"
					value={userId}
					onChange={(e) => setUserId(e.target.value)}
				/>
				<WelcomeButton type="submit">Start Session</WelcomeButton>
			</WelcomeForm>
		</WelcomeContainer>
	);
}

export default WelcomePage;
