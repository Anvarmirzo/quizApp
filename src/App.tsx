import React, { useState } from 'react';
import { Difficulty, fetchQuizQuestions, QuestionState } from './API/API';
import { Button, QuestionCard } from './components';

import { GlobalStyle, Wrapper } from './styles/App.styles';

export type AnswerObject = {
	question: string;
	answer: string;
	correct: boolean;
	correctAnswer: string;
};

function App() {
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState<QuestionState[]>([]);
	const [number, setNumber] = useState(0);
	const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);

	const TOTAL_QUESTIONS = 10;

	const startTrivia = async () => {
		setLoading(true);
		setGameOver(false);

		const newQuestions = await fetchQuizQuestions(
			TOTAL_QUESTIONS,
			Difficulty.EASY,
		);

		setQuestions(newQuestions);
		setScore(0);
		setUserAnswers([]);
		setNumber(0);
		setLoading(false);
		console.log(newQuestions);
	};
	const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!gameOver) {
			// Users answer
			const answer = e.currentTarget.value;
			// Check answer against correct answer
			const correct = questions[number].correct_answer === answer;
			// Add score if answer is correct
			if (correct) setScore((prev) => prev + 1);
			// Save answer in the array for user answers
			const answerObject = {
				question: questions[number].question,
				answer,
				correct,
				correctAnswer: questions[number].correct_answer,
			};
			setUserAnswers((prev) => [...prev, answerObject]);
		}
	};
	const nextQuestion = () => {
		// Move on to the next question if not the last question
		const nextQuestion = number + 1;
		if (nextQuestion === TOTAL_QUESTIONS) {
			setGameOver(true);
		} else {
			setNumber(nextQuestion);
		}
	};
	return (
		<>
			<GlobalStyle />
			<Wrapper>
				<h1>React Quiz</h1>
				{gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
					<Button className='startBtn' onClick={startTrivia}>
						Start
					</Button>
				) : null}
				{!gameOver ? <p className='score'>Score:{score}</p> : null}
				{loading ? <p className='score'>Loading questions...</p> : null}
				{!loading && !gameOver && (
					<QuestionCard
						questionNumber={number + 1}
						totalQuestions={TOTAL_QUESTIONS}
						question={questions[number].question}
						answers={questions[number].answers}
						userAnswer={userAnswers ? userAnswers[number] : undefined}
						callback={checkAnswer}
					/>
				)}
				{!gameOver &&
				!loading &&
				userAnswers.length === number + 1 &&
				number !== TOTAL_QUESTIONS - 1 ? (
					<Button className='nextBtn' onClick={nextQuestion}>
						Next Question
					</Button>
				) : null}
			</Wrapper>
		</>
	);
}

export default App;
