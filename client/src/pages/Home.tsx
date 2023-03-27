import Navbar from '../components/Navbar';
import VibeWrite from '../components/VibeWrite';
import Vibe from '../components/Vibe';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import Search from '../components/Search';
import { useQuery } from '../graphql';

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

  return (
    <div className="flex pb-20 pt-28 md:pb-28 lg:pb-6">
      <LeftSidebar />
      <div id="inputs" className="mx-auto flex flex-col gap-6">
        <VibeWrite />
        <div className="flex flex-col gap-6">
          {data.data?.timeline?.vibes.map((vibe, i) => (
            <Vibe
              key={i}
              avatar={vibe.user.avatar}
              username={vibe.user.username}
              date={vibe.createdAt}
              smileCount={vibe.smiles.count}
              message={vibe.message}
              commentCount={vibe.comments.count}
            />
          ))}
        </div>
      </div>
      <RightSidebar />
      <Navbar />
    </div>
  );
}
