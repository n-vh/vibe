import React from 'react';

interface Props {
  text: string;
}

export const Title: React.FC<Props> = ({ text }) => {
  document.title = text;
  return null;
};
