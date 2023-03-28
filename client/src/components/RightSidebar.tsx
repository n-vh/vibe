import React from 'react';

const RightSidebar: React.FC = () => {
  return (
    <div className="fixed right-0 mt-8 hidden w-[333px] rounded-l-[16px] bg-white bg-opacity-90 shadow-md lg:block">
      <div className="flex flex-col items-start pl-12 pt-10">
        <p className="pl-4 pb-12 font-roboto text-xl font-bold tracking-wider text-blue ">
          FRIENDS
        </p>
      </div>
    </div>
  );
};

export default RightSidebar;
