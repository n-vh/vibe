import Navbar from '../components/Navbar';
import Vibe from '../components/Vibe';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import Search from '../components/Search';
import { useQuery } from '../graphql';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

export function Profile() {
  return (
    <div className="flex pb-20 pt-28 md:pb-28 lg:pb-6">
      <LeftSidebar />

      <div className="mx-auto flex gap-6">
        <div className="mt-8 flex w-[355px] flex-shrink-0 flex-col gap-4 rounded-[16px] bg-white bg-opacity-90 p-5 shadow-md md:w-[500px] md:p-6">
          {/* HEADER */}

          <div className="flex">
            <img
              src={`/avatars/geisha.svg`}
              alt="avatar"
              className="h-16 w-16 md:h-20 md:w-20"
            ></img>

            <div className="my-auto flex flex-col pl-4">
              <p className="font-roboto tracking-wider text-dark-grey text-opacity-80 md:text-xl lg:text-lg">
                littlemango
              </p>
              <time className="font-roboto text-sm tracking-wider text-dark-pink md:text-base lg:text-sm">
                Member since 16/03/2023
              </time>
              <br />
              <p className="font-roboto text-sm tracking-wider text-dark-grey text-opacity-60 md:text-base lg:text-sm ">
                <b className="font-medium">30</b> followers
              </p>
              <p className="font-roboto text-sm tracking-wider text-dark-grey text-opacity-60 md:text-base lg:text-sm">
                <b className="font-medium">23</b> following
              </p>
            </div>

            <div className="flex self-start md:pl-24">
              <Button
                className="rounded-lg border-2 border-blue border-opacity-70 px-4 py-2 font-roboto text-sm font-bold tracking-wider text-blue hover:bg-gradient-to-r hover:from-pink hover:to-yellow md:text-lg lg:text-base"
                text="FOLLOW"
              ></Button>
            </div>
          </div>

          {/* BUTTONS */}

          <div className="my-2 h-[1px] w-full bg-dark-grey bg-opacity-30"></div>

          <div className="flex items-center gap-4 px-2">
            <Button
              className="font-mincho text-dark-grey text-opacity-70 duration-100 hover:text-dark-pink md:text-lg lg:text-base "
              text="vibes"
            />

            <div className="mx-4 h-4 w-[1px] bg-dark-grey bg-opacity-50"></div>

            <Button
              className=" font-mincho text-dark-grey text-opacity-70 duration-100 hover:text-dark-pink md:text-lg lg:text-base"
              text="comments"
            />

            <div className="mx-2 h-4 w-[1px] bg-dark-grey bg-opacity-50"></div>

            <Button
              className=" font-mincho text-dark-grey text-opacity-70 duration-100 hover:text-dark-pink md:text-lg lg:text-base"
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
