import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from 'urql';
import Button from './Button';

const VibeWrite: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState<string>('');
  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };
  const [data, execute] = useMutation(`
  mutation CreateVibe($message: String!){
    createVibe(message: $message) {
      id
      message
      createdAt
    }
  }
  `);

  const sendVibe = () => {
    execute({ message: value });
    setValue('');
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  }, [value]);

  return (
    <div className="mt-6 flex min-h-[90px] w-[355px] rounded-[16px] bg-white bg-opacity-90 p-3 shadow-md md:min-h-[110px] md:w-[500px] md:p-5">
      <div className="flex h-12 w-auto pr-3 md:h-14">
        <img src="/avatars/geisha.svg" alt="avatar"></img>
      </div>
      <textarea
        id="vibe"
        ref={textareaRef}
        onChange={textAreaChange}
        value={value}
        placeholder="send some positive vibes into the world..."
        className="w-[300px] resize-none bg-transparent font-roboto font-light tracking-wider sm:text-sm md:w-[375px] md:pt-3 md:text-base "
      ></textarea>
      <div className="flex">
        <Button className="flex self-end" onClick={sendVibe}>
          <img src="/send.svg" alt="send" className="h-[30px] w-full md:h-[35px]"></img>
        </Button>
      </div>
    </div>
  );
};

export default VibeWrite;
