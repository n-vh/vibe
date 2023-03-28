import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { getTimeString, pluralString } from '../utils/format';
import { useAuthContext } from '../hooks';

interface VibeProps {
  avatar: string;
  username: string;
  date: string;
  smileCount: number;
  message: string;
  commentCount: number;
  openReplying?: boolean;
}

const Vibe: React.FC<VibeProps> = ({
  avatar,
  username,
  date,
  smileCount,
  message,
  commentCount,
  openReplying = false,
}) => {
  const { user } = useAuthContext();
  const [value, setValue] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  }, [value]);

  const [replying, setReplying] = useState(openReplying);

  const toggleReply = () => {
    setReplying(!replying);
  };

  const handleSendReply = () => {
    setValue('');
    setReplying(false);
  };

  return (
    <div className="flex w-[355px] flex-shrink-0 flex-col gap-4 rounded-[16px] bg-white bg-opacity-90 p-5 shadow-md md:w-[500px] md:p-6">
      {/* HEADER */}

      <div className="flex">
        <Link to={`/profile/${username}`}>
          <img
            src={`/avatars/${avatar}.svg`}
            alt="avatar"
            className="h-12 w-12 md:h-14 md:w-14"
          ></img>
        </Link>

        <div className="my-auto flex flex-col pl-4">
          <Link
            to={`/profile/${username}`}
            className="font-roboto text-lg tracking-wider text-dark-grey text-opacity-80 md:text-xl lg:text-base"
          >
            {username}
          </Link>
          <time
            className="font-gothic text-dark-pink md:text-lg lg:text-sm"
            title={new Date(+date).toString()}
          >
            {getTimeString(+date)}
          </time>
        </div>

        <div className="ml-auto flex pt-1">
          <p className="pr-2 font-gothic leading-7 text-dark-grey text-opacity-70 md:text-lg md:leading-8 lg:text-sm lg:leading-9">
            {smileCount}
          </p>
          <div className="flex">
            <Button className="flex self-start">
              <img
                src="/pinksmiley.svg"
                alt="like"
                className="h-[30px] w-full md:h-[35px] lg:h-[30px]"
              />
            </Button>
          </div>
        </div>
      </div>

      {/* MESSAGE */}

      <div className="flex flex-wrap px-4">
        <p className="max-w-full whitespace-pre-wrap break-words text-left font-roboto font-light tracking-wider md:text-lg lg:text-sm">
          {message}
        </p>
      </div>

      {/* BUTTONS */}

      <div className="flex items-center gap-4 px-4">
        <Button
          className=" font-mincho text-[16px] text-dark-grey text-opacity-70 duration-100 hover:text-dark-pink md:text-lg lg:text-sm"
          text={`${commentCount} ${pluralString(commentCount, 'comment')}`}
        />

        {!openReplying && (
          <>
            <div className="mx-2 h-4 w-[1px] bg-dark-grey bg-opacity-50"></div>
            <Button
              className="font-mincho text-[16px] text-dark-grey text-opacity-70 duration-100 hover:text-dark-pink md:text-lg lg:text-sm"
              text="reply"
              onClick={toggleReply}
            />
          </>
        )}

        {user.username === username && (
          <>
            <div className="mx-2 h-4 w-[1px] bg-dark-grey bg-opacity-50"></div>
            <Button
              className="font-mincho text-[16px] text-dark-grey text-opacity-70 duration-100 hover:text-error md:text-lg lg:text-sm"
              text="delete"
            />
          </>
        )}
      </div>

      {(replying || openReplying) && (
        <div>
          <div className="my-2 h-[1px] w-full bg-dark-grey bg-opacity-30"></div>
          <div className="mt-4 flex">
            <div className="flex h-12 w-auto pr-3 md:h-14">
              <img src={`/avatars/${user.avatar}.svg`} alt="avatar" />
            </div>
            <div className="flex flex-grow pt-1">
              <textarea
                id="vibe"
                ref={textareaRef}
                onChange={textAreaChange}
                value={value}
                placeholder="reply..."
                className="w-full resize-none bg-transparent font-roboto font-light tracking-wider sm:text-sm md:text-base lg:text-sm "
              ></textarea>
            </div>
            <div className="flex">
              <Button className="flex self-end" onClick={handleSendReply}>
                <img
                  src="/send.svg"
                  alt="send"
                  className="h-[30px] w-full md:h-[35px] lg:h-[30px]"
                />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vibe;
