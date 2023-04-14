import React from 'react';
import { useCookieContext, usePrivacyContext } from '../hooks';
import Button from './Button';

const CookieModal: React.FC = () => {
  const { setShowPrivacy } = usePrivacyContext();
  const { closeCookies } = useCookieContext();

  const handlePrivacy = () => {
    setShowPrivacy(true);
  };

  return (
    <div className="fixed bottom-0 right-0 z-[90] flex h-auto w-[70%] flex-col gap-4 rounded-tl-[16px] bg-white p-6 md:w-[60%] lg:w-[35%]">
      <p className="text-center font-roboto text-sm tracking-wider text-blue md:px-4 md:pb-4 md:text-xl lg:px-6 lg:pt-4 lg:text-base">
        This website uses cookies to ensure you get the best experience on our website.
      </p>
      <div className="flex flex-col items-center gap-4 md:flex md:flex-row md:justify-center md:gap-6 md:pb-4 lg:pb-3">
        <Button
          className="w-[70%] rounded-[16px] border-[2.5px] border-dark-pink border-opacity-40 bg-pink py-1 font-roboto text-base font-extrabold tracking-wider text-dark-pink shadow-custom md:w-[50%] md:py-3 lg:w-[40%]"
          text="Privacy Policy"
          onClick={handlePrivacy}
        ></Button>
        <Button
          className="w-[70%] rounded-[16px] border-[2.5px] border-dark-pink border-opacity-40 bg-pink bg-opacity-40 py-1 font-roboto text-base font-extrabold tracking-wider text-dark-pink text-opacity-60 shadow-custom md:w-[50%] md:py-3 lg:w-[40%]"
          text="OK"
          onClick={closeCookies}
        ></Button>
      </div>
    </div>
  );
};

export default CookieModal;
