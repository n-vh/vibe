import React from 'react';
import Button from './Button';
import { useMutation } from 'urql';
import { useDeleteContext } from '../hooks';
import { Mutation } from '../graphql';

const DeleteModal: React.FC = () => {
  const { showDelete, resetShowDelete } = useDeleteContext();

  const [, executeDelete] = useMutation(Mutation.DeleteVibe);

  const handleDelete = () => {
    executeDelete({ vibeId: showDelete });
    resetShowDelete();
  };

  const handleCancel = () => {
    resetShowDelete();
  };

  return (
    <div className="fixed z-50 flex h-screen w-screen items-center justify-center overflow-hidden bg-dark-grey bg-opacity-50">
      <div className="flex h-auto w-[90%] flex-col gap-4 rounded-[16px] bg-white p-6 shadow-custom md:w-[80%] lg:w-[40%]">
        <p className="text-center font-roboto text-xl tracking-wider text-blue">
          Are you sure you want to delete your vibe?
        </p>
        <div className="flex flex-col gap-4 md:flex md:flex-row md:justify-center md:gap-6">
          <Button
            className="w-[90%] rounded-[16px] border-[2.5px] border-dark-pink border-opacity-40 bg-pink py-3 font-roboto text-xl font-extrabold tracking-wider text-dark-pink shadow-custom md:w-[40%]"
            text="Delete"
            onClick={handleDelete}
          ></Button>
          <Button
            className="w-[90%] rounded-[16px] border-[2.5px] border-dark-pink border-opacity-40 bg-pink bg-opacity-40 py-3 font-roboto text-xl font-extrabold tracking-wider text-dark-pink text-opacity-60 shadow-custom md:w-[40%]"
            text="Cancel"
            onClick={handleCancel}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
