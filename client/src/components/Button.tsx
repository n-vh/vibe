import React from 'react';

interface ButtonProps {
  id?: string;
  className?: string;
  type?: 'button';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  text?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  id,
  className,
  type,
  onClick,
  text,
  disabled = false,
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
    </button>
  );
};

export default Button;
