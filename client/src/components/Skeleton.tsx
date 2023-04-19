import React from 'react';

const Skeleton: React.FC = () => {
  return (
    <div className="mx-auto flex w-full flex-col gap-4">
      <div className="flex h-[190px] w-full rounded-[16px] bg-white bg-opacity-60 shadow-custom"></div>
      <div className="flex h-[250px] w-full rounded-[16px] bg-white bg-opacity-60 shadow-custom"></div>
      <div className="flex h-[230px] w-full rounded-[16px] bg-white bg-opacity-60 shadow-custom"></div>
      <div className="flex h-[250px] w-full rounded-[16px] bg-white bg-opacity-60 shadow-custom"></div>
      <div className="flex h-[230px] w-full rounded-[16px] bg-white bg-opacity-60 shadow-custom"></div>
      <div className="flex h-[230px] w-full rounded-[16px] bg-white bg-opacity-60 shadow-custom"></div>
    </div>
  );
};

export default Skeleton;
