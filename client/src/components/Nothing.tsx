import React from 'react';

const Nothing: React.FC = () => {
  return (
    <div className="flex flex-col rounded-[16px] bg-white p-2 shadow-custom">
      <img src="/sad.svg" alt="sad face"></img>
      <p className="font-blue font-roboto tracking-wider">Nothing to show here </p>
    </div>
  );
};

export default Nothing;
