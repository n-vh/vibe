import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import Message from './Message';
import { getTimeString, pluralString } from '../utils/format';
import { useAuthContext } from '../hooks';
import { useMutation } from '../graphql';
import { ObjectId } from 'mongodb';
import { useDeleteContext } from '../hooks/useDeleteContext';

interface CommentProps {
  id: ObjectId;
  idOP: string | undefined;
  avatar: string;
  username: string;
  usernameAuthor?: string;
  date: string;
  smileCount: number;
  hasSmiled: boolean;
  message: string;
}

const Comment: React.FC<CommentProps> = ({
  id,
  idOP,
  avatar,
  username,
  usernameAuthor,
  date,
  smileCount,
  hasSmiled,
  message,
}) => {
  const { user } = useAuthContext();

  /* smile */

  const [, executeSmile] = useMutation(`
  mutation smileVibe($smileVibeId: ObjectID!) {
    smileVibe(id: $smileVibeId) {
      id
    }
  }
`);

  const [, executeUnsmile] = useMutation(`
mutation smileVibe($smileVibeId: ObjectID!) {
  unsmileVibe(id: $smileVibeId) {
    id
  }
}
`);

  const handleSmile = () => {
    if (hasSmiled) {
      executeUnsmile({ smileVibeId: id });
    } else {
      executeSmile({ smileVibeId: id });
    }
  };

  /* scroll to top */

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* delete */

  const { setDeleteID } = useDeleteContext();

  const handleDelete = () => {
    setDeleteID(`${id}`);
  };

  return (
    <div className="flex w-[355px] flex-shrink-0 flex-col gap-4 rounded-[16px] bg-white bg-opacity-90 p-5 shadow-custom md:w-[500px] md:p-6">
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
          <Link
            to={`/vibe/${idOP}`}
            className="font-roboto text-sm tracking-wider text-dark-grey text-opacity-60 md:text-base lg:text-sm"
            onClick={handleScrollToTop}
          >
            <p>replying to @{usernameAuthor}</p>
          </Link>
        </div>

        <div className="ml-auto flex pt-1">
          <p className="pr-2 font-gothic leading-7 text-dark-grey text-opacity-70 md:text-lg md:leading-8 lg:text-sm lg:leading-[1.85rem]">
            {smileCount}
          </p>
          <div className="flex">
            <Button className="flex self-start" onClick={handleSmile}>
              <img
                src={hasSmiled ? '/smiled.svg' : '/pinksmiley.svg'}
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
          <Message text={message} />
        </p>
      </div>

      {/* BUTTONS */}

      <div className="flex items-center gap-4 px-4">
        {user.username === username && (
          <>
            <Button
              className="font-mincho text-[16px] text-dark-grey text-opacity-70 duration-100 hover:text-error md:text-lg lg:text-sm"
              text="delete"
              onClick={handleDelete}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
