import React from 'react';

interface ButtonProps {
  id?: string;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  text?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  id,
  className,
  type,
  onClick,
  disabled = false,
  text,
  children,
}) => {
  return (
    <button
      id={id}
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
