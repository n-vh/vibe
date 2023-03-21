import React from 'react';

interface FormProps {
  className?: string;
  title: string;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ className, title, children }) => {
  return (
    <div className="mx-6 flex flex-col items-center rounded-[16px] bg-white bg-opacity-80 shadow-md">
      <img src="/bluesmiley.svg" className="mt-8 mb-3 h-[48px] w-full"></img>
      <div className="m-2 flex h-[25vh] w-64 flex-col overflow-scroll">
        <p className="pl-1 pt-2 font-roboto text-xl font-medium tracking-wider text-blue">
          {title}
        </p>
        {children}
      </div>
    </div>
  );
};

export default Form;
