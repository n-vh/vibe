import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const LeftSidebar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="my-auto hidden h-[80vh] w-[333px] flex-col rounded-r-[16px] bg-white bg-opacity-90 shadow-md lg:flex">
      <div className="flex flex-col items-start pl-12 pt-10">
        <Button onClick={() => navigate('/home')}>
          <div className="flex flex-row items-center py-3">
            <img src="/bluehome.svg" alt="home" className="h-[40px]"></img>
            <p className="pl-4 font-roboto text-xl font-bold tracking-wider text-blue">
              HOME
            </p>
          </div>
        </Button>

        <Button onClick={() => navigate('/profile')}>
          <div className="flex flex-row items-center pb-3">
            <img src="/avatars/geisha.svg" alt="profile" className="h-[40px]"></img>
            <p className="pl-4 font-roboto text-xl font-bold tracking-wider text-blue">
              PROFILE
            </p>
          </div>
        </Button>

        <Button onClick={() => navigate('/home')}>
          <div className="flex flex-row items-center pb-3">
            <img src="/settings.svg" alt="home" className="h-[40px]"></img>
            <p className="pl-4 font-roboto text-xl font-bold tracking-wider text-blue">
              SETTINGS
            </p>
          </div>
        </Button>

        <Button onClick={() => navigate('/home')}>
          <div className="flex flex-row items-center pb-6">
            <img src="/logout.svg" alt="home" className="h-[40px]"></img>
            <p className="pl-4 font-roboto text-xl font-bold tracking-wider text-blue">
              LOG OUT
            </p>
          </div>
        </Button>
      </div>

      <div className="flex py-5">
        <img src="/bluesmiley.svg" alt="smile" className="mx-auto h-[44px]"></img>
      </div>

      <div className="flex px-6 text-center">
        <p className="pt-6 font-hubballi text-lg tracking-wider text-blue">
          Welcome to Vibe, a social media platform dedicated to sharing positive and
          uplifting news from around the world. Share stories, inspire one another, and
          spread joy.
        </p>
      </div>
    </div>
  );
};

export default LeftSidebar;
