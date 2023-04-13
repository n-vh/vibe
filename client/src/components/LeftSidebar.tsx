import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext, useSearchContext } from '../hooks';
import { handleScrollToTop } from '../utils/scroll';
import Button from './Button';

const LeftSidebar: React.FC = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuthContext();
  const { setShowSearch } = useSearchContext();

  const handleSearch = () => {
    setShowSearch(true);
  };

  const handleHome = () => {
    navigate('/');
    handleScrollToTop();
  };

  return (
    <div className="fixed mt-8 hidden w-[333px] flex-col lg:flex">
      <div className="w-[333px] rounded-r-[16px] bg-white bg-opacity-90 shadow-custom">
        <div className="flex flex-col items-start pl-12 pt-10">
          <Button onClick={handleHome}>
            <div className="flex flex-row items-center py-3">
              <img src="/home.svg" alt="home" className="h-[35px]" />
              <p className="pl-4 pt-1 font-gothic text-lg font-bold tracking-wider text-dark-pink">
                HOME
              </p>
            </div>
          </Button>

          <Button onClick={() => navigate(`/profile/${user.username}/vibes`)}>
            <div className="flex flex-row items-center pb-3">
              <img
                src={`/avatars/${user.avatar}.svg`}
                alt="profile"
                className="h-[35px]"
              ></img>
              <p className="pl-4 pt-1 font-gothic text-lg font-bold tracking-wider text-dark-pink">
                PROFILE
              </p>
            </div>
          </Button>

          <Button onClick={handleSearch}>
            <div className="flex flex-row items-center pb-3">
              <img src="/searchblue.svg" alt="search" className="h-[35px]" />
              <p className="pl-4 pt-1 font-gothic text-lg font-bold tracking-wider text-dark-pink">
                SEARCH
              </p>
            </div>
          </Button>

          <Button onClick={() => navigate('/settings')}>
            <div className="flex flex-row items-center pb-3">
              <img src="/settings.svg" alt="home" className="h-[35px]" />
              <p className="pl-4 pt-1 font-gothic text-lg font-bold tracking-wider text-dark-pink">
                SETTINGS
              </p>
            </div>
          </Button>

          <Button onClick={() => signOut()}>
            <div className="flex flex-row items-center pb-8">
              <img src="/logout.svg" alt="home" className="h-[35px]" />
              <p className="pl-4 pt-1 font-gothic text-lg font-bold tracking-wider text-dark-pink">
                LOG OUT
              </p>
            </div>
          </Button>
        </div>

        <div className="relative flex justify-center">
          <img
            src="/bluesmiley.svg"
            alt="smiley"
            className="top-O absolute z-30 h-[40px]"
          ></img>
          <div
            id="smileAnimation"
            className="top-O absolute h-[40px] w-[40px] rounded-full"
          ></div>
        </div>

        <div className="flex flex-col px-6 pt-8 text-center">
          <p className="py-8 font-hubballi text-lg tracking-wide text-blue">
            Welcome to Vibe, a social media platform dedicated to sharing positive and
            uplifting news from around the world. Share stories, inspire one another, and
            spread joy.
          </p>
        </div>
      </div>
      <div className="pt-3">
        <a
          className="pl-4 font-roboto text-[10px] tracking-wider text-dark-pink hover:underline"
          href="https://github.com/n-vh/vibe"
        >
          © 2023 VIBE &nbsp; |
        </a>
        <Link
          to="/terms"
          target="_blank"
          className="pl-2 font-roboto text-[10px] tracking-wider text-dark-pink hover:underline"
        >
          Terms and conditions
        </Link>
      </div>
    </div>
  );
};

export default LeftSidebar;
