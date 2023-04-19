import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleScrollToTop } from '../utils/scroll';
import { useAuthContext, useClickOutside, useSearchContext } from '../hooks';
import Button from './Button';

const Navbar: React.FC = () => {
  const { signOut, user } = useAuthContext();
  const navigate = useNavigate();

  const ref = useRef(null);
  useClickOutside(ref, () => setShowMore(false));

  const { setShowSearch } = useSearchContext();
  const handleSearch = () => {
    setShowSearch(true);
  };

  const handleHome = () => {
    navigate('/');
    handleScrollToTop();
  };

  const [showMore, setShowMore] = useState(false);

  const handleShowMenu = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <div className="fixed bottom-0 flex h-[7vh] w-full flex-nowrap justify-around bg-light-yellow lg:hidden ">
        <Button onClick={handleHome}>
          <img src="/home_icon.svg" alt="home" className="h-[45px] w-full md:h-[60px]" />
        </Button>

        <Button onClick={handleSearch}>
          <img
            src="/search_icon.svg"
            alt="search"
            className="h-[45px] w-full md:h-[60px]"
          />
        </Button>

        <Button onClick={handleShowMenu}>
          <img
            src={`/avatars/${user.avatar}.svg`}
            alt="profile"
            className="h-[45px] w-full md:h-[60px]"
          />
        </Button>
      </div>

      {showMore && (
        <div
          className="animate__animated animate__slideInRight animate__faster fixed right-0 bottom-0 mb-[7vh] flex h-[25%] w-auto rounded-tl-[16px] bg-light-yellow md:h-[30%] lg:hidden"
          ref={ref}
        >
          <div className="flex flex-col justify-center gap-3 px-8 pt-10 md:px-12">
            <Button onClick={() => navigate(`/profile/${user.username}/vibes`)}>
              <div className="flex flex-row items-center gap-4 pb-3">
                <img
                  src={`/avatars/${user.avatar}.svg`}
                  alt="profile"
                  className="h-[35px] md:h-[55px]"
                ></img>
                <img
                  src="/profile_text.svg"
                  alt="profile"
                  className="h-[28px] md:h-[36px]"
                />
              </div>
            </Button>

            <Button onClick={() => navigate('/settings')}>
              <div className="flex flex-row items-center gap-4 pb-3">
                <img
                  src="/settings_icon.svg"
                  alt="settings"
                  className="h-[35px] md:h-[55px]"
                />
                <img
                  src="/settings_text.svg"
                  alt="settings"
                  className="h-[28px] md:h-[36px]"
                />
              </div>
            </Button>

            <Button onClick={() => signOut()}>
              <div className="flex flex-row items-center gap-4 pb-6">
                <img
                  src="/logout_icon.svg"
                  alt="logout"
                  className="h-[35px] md:h-[55px]"
                />
                <img
                  src="/logout_text.svg"
                  alt="logout"
                  className="h-[28px] md:h-[36px]"
                />
              </div>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
