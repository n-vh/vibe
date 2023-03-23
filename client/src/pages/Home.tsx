import React from 'react';
import Navbar from '../components/Navbar';
import VibeWrite from '../components/VibeWrite';
import VibeFeed from '../components/VibeFeed';

export function Home() {
  return (
    <div className="flex h-screen flex-col pt-28">
      <VibeWrite />
      <VibeFeed />
      <Navbar />
    </div>
  );
}
