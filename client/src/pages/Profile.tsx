import Navbar from '../components/Navbar';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import { useQuery } from '../graphql';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { useAuthContext } from '../hooks';

export function Profile() {
  const { user } = useAuthContext();
  return (
    <div className="flex pb-20 pt-28 md:pb-28 lg:pb-6">
      <LeftSidebar />

      <div className="mx-auto flex">
        <div className="mt-8 flex w-[355px] flex-shrink-0 flex-col rounded-[16px] bg-white bg-opacity-90 p-5 shadow-custom md:w-[600px] md:p-6">
          {/* HEADER */}

          <div className="flex">
            <img
              src={`/avatars/${user.avatar}.svg`}
              alt="avatar"
              className="h-16 w-16 md:h-20 md:w-20"
            ></img>

            <div className="my-auto flex w-[90%] flex-col pt-2 pl-4 md:w-[65%]">
              <p className="font-roboto text-lg tracking-wider text-dark-grey text-opacity-80 md:text-xl lg:text-lg">
                littlemango
              </p>
              <time className="font-roboto tracking-wider text-dark-pink md:text-lg lg:text-sm">
                Member since 16/03/2023
              </time>
              <br />
            </div>

            <div className="hidden self-start md:flex">
              <Button
                className="rounded-lg border-2 border-dark-pink border-opacity-70 px-4 py-2 font-roboto text-sm font-bold tracking-wider text-dark-pink shadow-custom hover:bg-gradient-to-r hover:from-pink hover:to-yellow md:text-lg lg:text-base"
                text="FOLLOW"
              ></Button>
            </div>
          </div>

          {/* FOLLOW */}

          <div className="flex flex-row items-center gap-4 pb-4 pl-1 md:pl-2 md:pt-4">
            <div className="mt-2 flex self-start md:hidden">
              <Button
                className="rounded-lg border-2 border-dark-pink border-opacity-70 px-4 py-2 font-roboto text-sm font-bold tracking-wider text-dark-pink shadow-custom hover:bg-gradient-to-r hover:from-pink hover:to-yellow md:text-lg lg:text-base"
                text="FOLLOW"
              ></Button>
            </div>
            <p className="pt-2 font-roboto text-sm tracking-wider text-dark-grey text-opacity-60 md:pt-0 md:text-lg lg:text-sm ">
              <b className="font-medium">30</b> followers
            </p>
            <p className="pt-2 font-roboto text-sm tracking-wider text-dark-grey text-opacity-60 md:pt-0 md:text-lg lg:text-sm">
              <b className="font-medium">23</b> following
            </p>
          </div>

          {/* BUTTONS */}

          <div className="flex items-center gap-4 px-2">
            <Button
              className="font-mincho text-dark-grey text-opacity-70 duration-100 hover:text-dark-pink md:text-xl lg:text-base "
              text="vibes"
            />

            <div className="mx-4 h-4 w-[1px] bg-dark-grey bg-opacity-50"></div>

            <Button
              className=" font-mincho text-dark-grey text-opacity-70 duration-100 hover:text-dark-pink md:text-xl lg:text-base"
              text="comments"
            />

            <div className="mx-2 h-4 w-[1px] bg-dark-grey bg-opacity-50"></div>

            <Button
              className=" font-mincho text-dark-grey text-opacity-70 duration-100 hover:text-dark-pink md:text-xl lg:text-base"
              text="smiles"
            />
          </div>
        </div>
      </div>

      <RightSidebar />
      <Navbar />
    </div>
  );
}
