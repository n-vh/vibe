import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="mx-auto flex items-center gap-4 rounded-[16px] bg-white bg-opacity-60 p-4 px-6">
      <img
        className="h-[30px] animate-[spin_3s_linear_infinite] md:h-[40px]"
        src="/loading.svg"
        alt="loading"
      ></img>
      <p className="font-roboto text-lg tracking-wider text-blue md:text-xl">Loading</p>
    </div>
  );
};

export default Loading;
