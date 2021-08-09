import React from 'react';
import { Button } from '../Button/Button';
import { QuestionCardProps } from './QuestionCard.props';

export const QuestionCard = ({
	question,
	answers,
	callback,
	userAnswer,
	questionNumber,
	totalQuestions,
}: QuestionCardProps) => (
	<div>
		<p className='number'>
			Question: {questionNumber}/{totalQuestions}
		</p>
		<p dangerouslySetInnerHTML={{ __html: question }}></p>
		<ul>
			{answers.map((answer) => (
				<li key={answer}>
					<Button disabled={!!userAnswer} value={answer} onClick={callback}>
						<span dangerouslySetInnerHTML={{ __html: answer }}></span>
					</Button>
				</li>
			))}
		</ul>
	</div>
);
