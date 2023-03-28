import React from 'react';
import Button from './Button';
import { useRef } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';
import { useSearchContext } from '../hooks/useSearchContext';

const Search: React.FC = () => {
  const ref = useRef(null);
  const { setShowSearch } = useSearchContext();

  useClickOutside(ref, () => setShowSearch(false));

  return (
    <div className="fixed z-40 flex h-screen w-screen items-center justify-center overflow-hidden bg-dark-grey bg-opacity-50">
      <div
        id="inputs"
        className="flex h-12 w-[90%] rounded-[16px] bg-white p-2 shadow-md md:h-14 md:w-[80%] lg:w-[40%]"
        ref={ref}
      >
        <input
          type="text"
          className="text-md w-full bg-transparent pl-3 font-roboto font-light tracking-wider focus:border-transparent md:text-lg"
          placeholder="Search vibe users"
          autoFocus={true}
        ></input>
        <div className="ml-auto flex h-full">
          <Button>
            <img
              src="/searchoutline.svg"
              alt="search"
              className="min-h-[32px] px-2"
            ></img>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Search;
