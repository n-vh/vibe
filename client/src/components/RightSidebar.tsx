import React from 'react';

const RightSidebar: React.FC = () => {
  return (
    <div className="my-auto hidden h-[80vh] w-[333px] flex-col rounded-l-[16px] bg-white bg-opacity-90 shadow-md lg:flex">
      <div className="flex flex-col items-start pl-12 pt-10">
        <p className="pl-4 font-roboto text-2xl font-bold tracking-wider text-blue">
          # POPULAR TAGS
        </p>
      </div>
    </div>
  );
};

export default RightSidebar;
