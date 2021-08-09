import React from 'react';
import { Button } from '../Button/Button';
import { QuestionCardProps } from './QuestionCard.props';
import { ButtonWrapper, Wrapper } from './../../styles/QuestionCard.styled';

export const QuestionCard = ({
	question,
	answers,
	callback,
	userAnswer,
	questionNumber,
	totalQuestions,
}: QuestionCardProps) => (
	<Wrapper>
		<p className='number'>
			Question: {questionNumber}/{totalQuestions}
		</p>
		<p dangerouslySetInnerHTML={{ __html: question }}></p>
		<ul>
			{answers.map((answer) => (
				<ButtonWrapper
					correct={userAnswer?.correctAnswer === answer}
					userClicked={userAnswer?.answer === answer}
					className='answer'
					key={answer}
				>
					<Button disabled={!!userAnswer} value={answer} onClick={callback}>
						<span dangerouslySetInnerHTML={{ __html: answer }}></span>
					</Button>
				</ButtonWrapper>
			))}
		</ul>
	</Wrapper>
);
