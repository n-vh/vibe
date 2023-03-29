import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../hooks';
import { useSearchContext } from '../hooks/useSearchContext';
import Button from './Button';
import { handleScrollToTop } from '../utils/scroll';

const LeftSidebar: React.FC = () => {
  const { signOut, user } = useAuthContext();
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
    <div className="fixed mt-8 hidden w-[333px] flex-col lg:flex">
      <div className="w-[333px] rounded-r-[16px] bg-white bg-opacity-90 shadow-custom">
        <div className="flex flex-col items-start pl-12 pt-10">
          <Button onClick={handleHome}>
            <div className="flex flex-row items-center py-3">
              <img src="/bluehome.svg" alt="home" className="h-[35px]" />
              <p className="pl-4 font-roboto text-lg font-bold tracking-wider text-blue">
                HOME
              </p>
            </div>
          </Button>

          <Button onClick={() => navigate(`/profile/${user.username}`)}>
            <div className="flex flex-row items-center pb-3">
              <img
                src={`/avatars/${user.avatar}.svg`}
                alt="profile"
                className="h-[35px]"
              ></img>
              <p className="pl-4 font-roboto text-lg font-bold tracking-wider text-blue">
                PROFILE
              </p>
            </div>
          </Button>

          <Button onClick={handleSearch}>
            <div className="flex flex-row items-center pb-3">
              <img src="/searchblue.svg" alt="search" className="h-[35px]" />
              <p className="pl-4 font-roboto text-lg font-bold tracking-wider text-blue">
                SEARCH
              </p>
            </div>
          </Button>

          <Button onClick={() => navigate('/')}>
            <div className="flex flex-row items-center pb-3">
              <img src="/settings.svg" alt="home" className="h-[35px]" />
              <p className="pl-4 font-roboto text-lg font-bold tracking-wider text-blue">
                SETTINGS
              </p>
            </div>
          </Button>

          <Button onClick={() => signOut()}>
            <div className="flex flex-row items-center">
              <img src="/logout.svg" alt="home" className="h-[35px]" />
              <p className="pl-4 font-roboto text-lg font-bold tracking-wider text-blue">
                LOG OUT
              </p>
            </div>
          </Button>
        </div>

        <div className="flex pt-8">
          <img src="/bluesmiley.svg" alt="smile" className="mx-auto h-[40px]" />
        </div>

        <div className="flex flex-col px-6 text-center">
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
