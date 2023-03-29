import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks';
import { useSearchContext } from '../hooks/useSearchContext';
import Button from './Button';
import { handleScrollToTop } from '../utils/scroll';

const Navbar: React.FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { setShowSearch } = useSearchContext();

  const handleSearch = () => {
    setShowSearch(true);
  };

  const handleHome = () => {
    navigate('/');
    handleScrollToTop();
  };

  return (
    <div className="fixed bottom-0 flex h-[7vh] w-full flex-nowrap justify-around bg-light-yellow lg:hidden ">
      <Button onClick={handleHome}>
        <img src="/home.svg" alt="home" className="h-[45px] w-full md:h-[60px]" />
      </Button>

      <Button onClick={handleSearch}>
        <img src="/searchfull.svg" alt="search" className="h-[45px] w-full md:h-[60px]" />
      </Button>

      <Button onClick={() => navigate(`/profile/${user.username}/vibes`)}>
        <img
          src={`/avatars/${user.avatar}.svg`}
          alt="profile"
          className="h-[45px] w-full md:h-[60px]"
        />
      </Button>
    </div>
  );
};

export default Navbar;
