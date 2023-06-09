import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getTimeString, pluralString } from '../utils/format';
import { useAuthContext, useDeleteContext } from '../hooks';
import { Mutation, useMutation } from '../graphql';
import { ObjectId } from 'mongodb';
import Button from './Button';
import Message from './Message';

interface VibeProps {
  id: ObjectId;
  avatar: string;
  username: string;
  date: string;
  smileCount: number;
  hasSmiled: boolean;
  message: string;
  commentCount: number;
  openReplying?: boolean;
}

const Vibe: React.FC<VibeProps> = ({
  id,
  avatar,
  username,
  date,
  smileCount,
  hasSmiled,
  message,
  commentCount,
  openReplying = false,
}) => {
  const { user } = useAuthContext();
  const [replyMessage, setReplyMessage] = useState<string>('');

  /* text area */

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyMessage(event.target.value);
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  }, [replyMessage]);

  /* smile */

  const [, executeAddSmile] = useMutation(Mutation.AddSmile);
  const [, executeRemoveSmile] = useMutation(Mutation.RemoveSmile);

  const handleSmile = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (hasSmiled) {
      executeRemoveSmile({ vibeId: id });
      e.currentTarget.children[0].classList.remove('animate__bounce');
    } else {
      executeAddSmile({ vibeId: id });
      e.currentTarget.children[0].classList.add('animate__bounce');
    }
  };

  /* reply */

  const [replying, setReplying] = useState(openReplying);

  const toggleReply = () => {
    setReplying(!replying);
  };

  const [, executeAddComment] = useMutation(Mutation.AddComment);

  const handleSendReply = () => {
    setReplyMessage('');
    setReplying(false);
    executeAddComment({ vibeId: id, message: replyMessage });
  };

  /* delete */

  const { setDeleteID } = useDeleteContext();

  const handleDelete = () => {
    setDeleteID(`${id}`);
  };

  return (
    <div className="flex flex-shrink-0 flex-col gap-4 rounded-[16px] bg-white bg-opacity-90 p-5 shadow-custom  md:p-6">
      {/* HEADER */}

      <div className="flex">
        <Link to={`/profile/${username}/vibes`}>
          <img
            src={`/avatars/${avatar}.svg`}
            alt="avatar"
            className="h-12 w-12 md:h-14 md:w-14"
          ></img>
        </Link>

        <div className="my-auto flex flex-col pl-4">
          <Link
            to={`/profile/${username}/vibes`}
            className="font-roboto text-lg tracking-wider text-dark-grey text-opacity-80 md:text-xl lg:text-base"
          >
            {username}
          </Link>
          <Link to={`/vibe/${id}`}>
            <time
              className="font-gothic text-dark-pink md:text-lg lg:text-sm"
              title={new Date(+date).toString()}
            >
              {getTimeString(+date)}
            </time>
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
                className="animate__animated h-[30px] w-full md:h-[35px] lg:h-[30px] "
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
        <Link to={`/vibe/${id}`}>
          <Button
            className=" font-mincho text-[16px] text-dark-grey text-opacity-70 duration-100 hover:text-dark-pink md:text-lg lg:text-sm"
            text={`${commentCount} ${pluralString(commentCount, 'comment')}`}
          />
        </Link>

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
              onClick={handleDelete}
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
                value={replyMessage}
                placeholder="reply..."
                className="w-full resize-none bg-transparent font-roboto font-light tracking-wider sm:text-sm md:text-base lg:text-sm "
                autoFocus={true}
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
