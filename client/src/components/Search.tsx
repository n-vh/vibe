import React from 'react';
import Button from './Button';

const Search: React.FC = () => {
  return (
    <div className="mt-14 hidden min-h-[10px] w-[500px] rounded-[16px] bg-white bg-opacity-90 p-2 shadow-md lg:flex">
      <input
        type="text"
        size={55}
        className="text-md bg-transparent pl-3 font-roboto font-light tracking-wider focus:border-transparent"
        placeholder="Search vibe"
      ></input>
      <div className="ml-auto flex h-full">
        <Button>
          <img src="/searchoutline.svg" alt="search" className="min-h-[32px] pr-2"></img>
        </Button>
      </div>
    </div>
  );
};

export default Search;
