import React from 'react';
import { Link } from 'react-router-dom';
import { useSearchContext } from '../hooks';

interface UserProps {
  avatar: string;
  username: string;
}

const User: React.FC<UserProps> = ({ avatar, username }) => {
  const { setShowSearch } = useSearchContext();

  const handleOnClick = () => {
    setShowSearch(false);
  };

  return (
    <div className="flex p-2">
      <Link to={`/profile/${username}/vibes`} onClick={handleOnClick}>
        <img
          src={`/avatars/${avatar}.svg`}
          alt="avatar"
          className="h-12 w-12 md:h-14 md:w-14"
        ></img>
      </Link>

      <div className="my-auto flex flex-col pl-4">
        <Link
          to={`/profile/${username}/vibes`}
          className="font-roboto text-lg tracking-wider text-dark-grey text-opacity-80 md:text-xl lg:text-base"
          onClick={handleOnClick}
        >
          {username}
        </Link>
      </div>
    </div>
  );
};

export default User;
