import React from 'react';
import Navbar from '../components/Navbar';
import VibeWrite from '../components/VibeWrite';
import VibeFeed from '../components/VibeFeed';
import LeftSidebar from '../components/LeftSideBar';
import RightSidebar from '../components/RightSidebar';
import Search from '../components/Search';

export function Home() {
  return (
    <div className="flex h-screen pt-28">
      <LeftSidebar />
      <div className="mx-auto flex flex-col">
        <Search />
        <VibeWrite />
        <VibeFeed />
      </div>
      <RightSidebar />
      <Navbar />
    </div>
  );
}
