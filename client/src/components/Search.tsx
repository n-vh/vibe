import React, { FormEvent } from 'react';
import Button from './Button';
import { useRef, useState } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';
import { useSearchContext } from '../hooks/useSearchContext';
import { useQuery } from '../graphql';
import User from './User';

const Search: React.FC = () => {
  const ref = useRef(null);
  const { setShowSearch } = useSearchContext();

  useClickOutside(ref, () => setShowSearch(false));

  const [inputValue, setInputValue] = useState('');

  const [queryUsers, executeQueryUsers] = useQuery({
    query: `query QueryUsers($query: String!) {
      searchUsers(query: $query) {
        id
        username
        avatar
      }
    }`,
    variables: { query: inputValue },
    pause: true,
  });

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    executeQueryUsers();
  };

  return (
    <div className="fixed z-40 flex h-screen w-screen items-center justify-center overflow-hidden bg-dark-grey bg-opacity-50">
      <div className="flex w-[90%] flex-col gap-4 md:w-[80%] lg:w-[40%]" ref={ref}>
        <form
          id="inputs"
          className="flex h-12 rounded-[16px] bg-white p-2 md:h-14"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            className="text-md w-full bg-transparent pl-3 font-roboto font-light tracking-wider focus:border-transparent md:text-lg"
            placeholder="Search vibe users"
            autoFocus={true}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          ></input>
          <div className="ml-auto flex h-full">
            <Button type="submit">
              <img
                src="/searchoutline.svg"
                alt="search"
                className="min-h-[32px] px-2"
              ></img>
            </Button>
          </div>
        </form>

        <div className="flex flex-col gap-4 ">
          {queryUsers.data?.searchUsers.map((vibe) => (
            <div className="rounded-[16px] bg-white bg-opacity-80">
              <User avatar={vibe.avatar} username={vibe.username} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
