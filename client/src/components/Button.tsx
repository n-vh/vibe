import React from 'react';

interface ButtonProps {
  id?: string;
  className?: string;
  type?: 'button';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  text?: string;
}

const Button: React.FC<ButtonProps> = ({ id, className, type, onClick, text }) => {
  return (
    <button id={id} className={className} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
