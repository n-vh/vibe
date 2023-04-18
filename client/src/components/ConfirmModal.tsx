import React from 'react';
import Button from './Button';

interface ConfirmModalProps {
  children: React.ReactNode;
  textAction?: string;
  textCancel?: string;
  action: () => void;
  closeModal: () => void;
  disabled?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  children,
  textAction = 'Confirm',
  textCancel = 'Cancel',
  action,
  closeModal,
  disabled,
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[100] flex h-screen w-screen items-center justify-center overflow-hidden bg-dark-grey bg-opacity-50">
      <div
        id="withBorder"
        className="animate__animated animate__bounceInUp flex h-auto w-[90%] flex-col gap-4 rounded-[16px] bg-white p-8 shadow-custom md:w-[80%] lg:w-[40%]"
      >
        <p className="text-center font-roboto text-xl tracking-wider text-dark-grey text-opacity-60">
          {children}
        </p>
        <div className="flex flex-col items-center gap-4 pt-2 md:flex md:flex-row md:justify-center md:gap-6">
          <Button
            className="w-[90%] rounded-[16px] border-[2.5px] border-dark-pink border-opacity-40 bg-pink py-3 font-roboto text-xl font-extrabold tracking-wider text-dark-pink shadow-custom disabled:opacity-60 md:w-[40%]"
            text={textAction}
            onClick={action}
            disabled={disabled}
          ></Button>
          <Button
            className="w-[90%] rounded-[16px] border-[2.5px] border-dark-pink border-opacity-40 bg-pink bg-opacity-40 py-3 font-roboto text-xl font-extrabold tracking-wider text-dark-pink text-opacity-60 shadow-custom md:w-[40%]"
            text={textCancel}
            onClick={closeModal}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
