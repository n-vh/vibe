import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';

const VibeWrite: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState<String>();
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

  return (
    <div className="shadow-m w-[355px]flex-row mx-auto mt-12 flex min-h-[90px] rounded-[16px] bg-white bg-opacity-90 p-3 md:min-h-[110px] md:w-[500px] md:p-4">
      <div className="flex h-12 w-auto pr-3 md:h-14">
        <img src="/avatars/geisha.svg" alt="avatar"></img>
      </div>
      <textarea
        id="vibe"
        ref={textareaRef}
        onChange={textAreaChange}
        placeholder="send some positive vibes into the world..."
        className="w-[300px] resize-none bg-transparent font-roboto font-light tracking-wider md:w-[375px] md:text-lg "
      ></textarea>
      <div className="relative flex">
        <Button className="flex self-end">
          <img src="/send.svg" alt="send" className="h-[30px] w-full md:h-[35px]"></img>
        </Button>
      </div>
    </div>
  );
};

export default VibeWrite;
