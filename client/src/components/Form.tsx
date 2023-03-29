import React from 'react';

interface FormProps {
  className?: string;
  title: string;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ className, title, children }) => {
  return (
    <div className="mx-6 flex flex-col items-center rounded-[16px] bg-white bg-opacity-80 pb-8 shadow-custom">
      <img src="/bluesmiley.svg" className="mt-8 mb-1 h-[48px] w-full" />
      <div className="m-2 flex w-72 flex-col ">
        <p className="pl-1 pt-2 pb-6 text-center font-roboto text-xl font-semibold tracking-wider text-blue">
          {title}
        </p>
        {children}
      </div>
    </div>
  );
};

export default Form;
