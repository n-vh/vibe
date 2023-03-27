import React from 'react';
import Button from './Button';
import { getTimeString, pluralString } from '../utils/format';

interface VibeProps {
  avatar: string;
  username: string;
  date: string;
  smileCount: number;
  message: string;
  commentCount: number;
}

const Vibe: React.FC<VibeProps> = ({
  avatar,
  username,
  date,
  smileCount,
  message,
  commentCount,
}) => {
  return (
    <div className="mt-6 flex min-h-[90px] w-[355px] flex-shrink-0 flex-col gap-4 rounded-[16px] bg-white bg-opacity-90 p-5 shadow-md md:min-h-[190px] md:w-[500px] md:p-6">
      <div className="flex">
        <img
          src={`/avatars/${avatar}.svg`}
          alt="avatar"
          className="h-14 w-14 md:h-16 md:w-16 lg:h-14"
        ></img>

        <div className="my-auto flex flex-col pl-4">
          <Link
            to={`/profile/${username}`}
            className="font-roboto text-[18px] tracking-wider text-dark-grey md:text-xl lg:text-lg"
          >
            {username}
          </Link>
          <time
            className="font-gothic text-dark-pink md:text-lg lg:text-base"
            title={new Date(date).toString()}
          >
            {getTimeString(+date)}
          </time>
        </div>

        <div className="ml-auto flex pt-1">
          <p className="pr-2 font-gothic text-[16px] leading-7 text-dark-grey text-opacity-70 md:text-lg md:leading-8 lg:text-base lg:leading-9">
            {smileCount}
          </p>
          <div className="flex">
            <Button className="flex self-start">
              <img
                src="/pinksmiley.svg"
                alt="like"
                className="h-[30px] w-full md:h-[35px]"
              />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap px-4">
        <p className="max-w-full break-words text-left font-roboto font-light tracking-wider md:text-lg lg:text-base">
          {message}
        </p>
      </div>

      <div className="flex items-center gap-4 px-4">
        <Button
          className=" font-mincho text-[16px] text-dark-grey text-opacity-70 duration-200 hover:text-dark-pink md:text-lg lg:text-base"
          text={`${commentCount} ${pluralString(commentCount, 'message')}`}
        />
        <div className="mx-2 h-4 w-[1px] bg-dark-grey bg-opacity-50"></div>
        <Button
          className="font-mincho text-[16px] text-dark-grey text-opacity-70 duration-200 hover:text-dark-pink md:text-lg lg:text-base"
          text="reply"
        />
        <div className="mx-2 h-4 w-[1px] bg-dark-grey bg-opacity-50"></div>
        <Button
          className="font-mincho text-[16px] text-dark-grey text-opacity-70 duration-200 hover:text-error md:text-lg lg:text-base"
          text="delete"
        />
      </div>
    </div>
  );
};

export default Vibe;
