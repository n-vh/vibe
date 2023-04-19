import React from 'react';

const Nothing: React.FC = () => {
  return (
    <div className="mx-auto flex gap-4 rounded-[16px] bg-white bg-opacity-60 p-4 px-6">
      <img className="h-[30px]" src="/sad.svg" alt="sad face"></img>
      <p className="font-roboto text-lg tracking-wider text-blue">
        Nothing to show here...
      </p>
    </div>
  );
};

export default Nothing;
