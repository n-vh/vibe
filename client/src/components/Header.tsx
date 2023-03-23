import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div className="fixed flex w-full">
      <img src="/wave.svg" className="h-[120px] w-full"></img>
      <Link
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform font-days text-6xl text-white"
        to="/"
      >
        vibe
      </Link>
    </div>
  );
};

export default Header;
