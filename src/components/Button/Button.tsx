import React from 'react';
import { ButtonProps } from './Button.props';

export const Button = ({ children, ...props }: ButtonProps) => {
	return <button {...props}>{children}</button>;
};
