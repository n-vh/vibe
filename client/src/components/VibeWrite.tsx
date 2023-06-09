import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { useMutation } from 'urql';
import { useAuthContext } from '../hooks';
import Button from './Button';
import { Mutation } from '../graphql';

const VibeWrite: React.FC = () => {
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

  const { user } = useAuthContext();
  const [, executeCreateVibe] = useMutation(Mutation.CreateVibe);

  const sendVibe = (e: FormEvent) => {
    e.preventDefault();
    executeCreateVibe({ message: value });
    setValue('');
  };

  return (
    <form
      className="mt-8 flex min-h-[90px] gap-4 rounded-[16px] bg-white bg-opacity-90 p-3 shadow-custom md:min-h-[110px] md:p-5"
      onSubmit={sendVibe}
    >
      <div className="flex h-12 w-auto pr-3 md:h-14">
        <img
          className="h-12 w-12 md:h-14 md:w-14"
          src={`/avatars/${user.avatar}.svg`}
          alt="avatar"
        />
      </div>
      <div className="flex flex-grow pt-1">
        <textarea
          id="vibe"
          ref={textareaRef}
          onChange={textAreaChange}
          value={value}
          placeholder="send some positive vibes into the world..."
          className="w-full resize-none overflow-hidden bg-transparent font-roboto font-light tracking-wider sm:text-sm md:text-base"
        ></textarea>
      </div>
      <div className="flex">
        <Button className="flex self-end" type="submit">
          <img
            src="/send.svg"
            alt="send"
            className="h-[30px] w-full md:h-[35px] lg:h-[30px]"
          />
        </Button>
      </div>
    </form>
  );
};

export default VibeWrite;
