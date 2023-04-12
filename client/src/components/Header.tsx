import React from 'react';
import { Link } from 'react-router-dom';
import { handleScrollToTop } from '../utils/scroll';
import Button from './Button';

const Header: React.FC = () => {
  const handleBack = () => {
    history.go(-1);
  };

  const handleHome = () => {
    handleScrollToTop();
  };

  return (
    <div className="fixed flex w-full">
      <img
        src="/wave.svg"
        className="animate__animated animate__pulse h-[120px] w-full"
      />
      <Button
        className="absolute top-8 block h-12 w-12 p-2 md:left-2 md:h-14 md:w-14 lg:hidden"
        onClick={handleBack}
      >
        <img src="/back.svg"></img>
      </Button>

      <Link to="/">
        <img
          className="absolute top-1/2 left-1/2 h-[80px] -translate-x-1/2 -translate-y-1/2"
          src="/logo.svg"
          onClick={handleHome}
        />
      </Link>
    </div>
  );
};

export default Header;
