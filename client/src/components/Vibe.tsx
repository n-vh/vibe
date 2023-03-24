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
    <div className="mt-6 flex min-h-[90px] w-[355px] flex-shrink-0 flex-col rounded-[16px] bg-white bg-opacity-90 p-5 shadow-md md:min-h-[190px] md:w-[500px] md:p-6">
      <div className="flex pb-5">
        <img
          src={`/avatars/${avatar}.svg`}
          alt="avatar"
          className="h-14 w-14 md:h-16 md:w-16 lg:h-14"
        ></img>

        <div className="my-auto flex flex-col pl-4">
          <h1 className="font-roboto text-[18px] tracking-wider text-dark-grey md:text-xl lg:text-lg">
            {username}
          </h1>
          <h2 className="font-gothic text-dark-pink md:text-lg lg:text-base">
            {getTimeString(+date)}
          </h2>
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
              ></img>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex w-[300px] flex-wrap self-center px-1 pb-2 md:w-[375px] lg:self-start lg:pl-4">
        <p className="max-w-full break-words text-left font-roboto font-light tracking-wider md:text-lg lg:text-base">
          {message}
        </p>
      </div>

      <div className="flex p-2">
        <Button
          className="pr-6 pl-1 font-mincho text-[16px] text-dark-grey text-opacity-70 md:pr-8 md:pl-8 md:text-lg lg:pl-2 lg:text-base"
          text={`${commentCount} ${pluralString(commentCount, 'message')}`}
        ></Button>
        <Button
          className="font-mincho text-[16px] text-dark-grey text-opacity-70 md:text-lg lg:text-base"
          text="reply"
        ></Button>
      </div>
    </div>
  );
};

export default Vibe;
