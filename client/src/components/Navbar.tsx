import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 flex h-[7vh] w-full flex-nowrap justify-around bg-light-yellow lg:hidden ">
      <Button onClick={() => navigate('/home')}>
        <img src="/home.svg" alt="home" className="h-[45px] w-full md:h-[60px]"></img>
      </Button>
      <Button>
        <img
          src="/searchfull.svg"
          alt="search"
          className="h-[50px] w-full md:h-[65px]"
        ></img>
      </Button>
      <Button onClick={() => navigate('/profile')}>
        <img
          src="/avatars/geisha.svg"
          alt="profile"
          className="h-[45px] w-full md:h-[60px]"
        ></img>
      </Button>
    </div>
  );
};

export default Navbar;
