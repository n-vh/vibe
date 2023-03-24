import React, { useEffect } from 'react';
import { useQuery } from 'urql';
import Navbar from '../components/Navbar';
import VibeWrite from '../components/VibeWrite';
import Vibe from '../components/Vibe';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import Search from '../components/Search';

export function Home() {
  const [data] = useQuery({
    query: `
      query Timeline {
        timeline {
          vibes {
            id
            comments {
              count
            }
            createdAt
            message
            smiles {
              count
            }
            user {
              username
              avatar
            }
          }
        }
      }`,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="flex pb-20 pt-28 md:pb-28 lg:pb-6">
      <LeftSidebar />
      <div className="mx-auto flex flex-col">
        <Search />
        <VibeWrite />
        {data.data &&
          data.data.timeline.vibes.map((vibe) => (
            <Vibe
              avatar={vibe.user.avatar}
              username={vibe.user.username}
              date={vibe.createdAt}
              smileCount={vibe.smiles.count}
              message={vibe.message}
              commentCount={vibe.comments.count}
            />
          ))}
      </div>
      <RightSidebar />
      <Navbar />
    </div>
  );
}
