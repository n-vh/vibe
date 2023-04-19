import React from 'react';

interface MessageProps {
  text: string;
}

const Message: React.FC<MessageProps> = ({ text }) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const segments = text.split(urlRegex);

  const nodes = segments.map((segment, index) => {
    if (segment.match(urlRegex)) {
      return (
        <a
          className="underline"
          key={index}
          href={segment}
          target="_blank"
          rel="noopener noreferrer"
        >
          {segment}
        </a>
      );
    } else {
      return segment;
    }
  });
  return <>{nodes}</>;
};

export default Message;
