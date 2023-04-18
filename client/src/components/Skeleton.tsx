import React from 'react';

const Skeleton: React.FC = () => {
  return (
    <div className="mx-auto flex w-full flex-col gap-4">
      <div className="mt-12 flex h-[90px] w-full rounded-[16px] bg-white bg-opacity-60 p-3 shadow-custom md:h-[110px] md:p-5"></div>
      <div className="flex h-[110px] w-full rounded-[16px] bg-white bg-opacity-60 p-5 shadow-custom md:h-[150px] md:p-6"></div>
      <div className="flex h-[130px] w-full rounded-[16px] bg-white bg-opacity-60 p-5 shadow-custom md:h-[180px] md:p-6"></div>
      <div className="flex h-[110px] w-full rounded-[16px] bg-white bg-opacity-60 p-5 shadow-custom md:h-[150px] md:p-6"></div>
      <div className="flex h-[130px] w-full rounded-[16px] bg-white bg-opacity-60 p-5 shadow-custom md:h-[180px] md:p-6"></div>
      <div className="flex h-[130px] w-full rounded-[16px] bg-white bg-opacity-60 p-5 shadow-custom md:h-[180px] md:p-6"></div>
    </div>
  );
};

export default Skeleton;
