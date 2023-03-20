import mongoose from 'mongoose';

export const Database = {
  connect: async () => {
    const url = import.meta.env.VITE_DATABASE_URI;
    try {
      mongoose.set('strictQuery', true);
      await mongoose.connect(url);
    } catch (e) {
      console.error(e);
    }
  },
};
