import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import VibeComponent from '../components/Vibe';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import Search from '../components/Search';
import { useQuery } from '../graphql';

export function Vibe() {
  const { id } = useParams();

  const [query] = useQuery({
    query: `
      query Vibe($id: String!) {
        vibe(id: $id) {
          id
          user {
            id
            username
            avatar
          }
          message
          comments {
            count
          }
          smiles {
            count
          }
          createdAt
        }
      }
    `,
    variables: { id: id },
  });

  return (
    <div className="flex pb-20 pt-28 md:pb-28 lg:pb-6">
      <LeftSidebar />
      <div id="inputs" className="mx-auto flex flex-col gap-6">
        <Search />
        <div className="flex flex-col gap-6">
          {query.data?.vibe && (
            <VibeComponent
              avatar={query.data.vibe.user.avatar}
              username={query.data.vibe.user.username}
              date={query.data.vibe.createdAt}
              smileCount={query.data.vibe.smiles.count}
              message={query.data.vibe.message}
              commentCount={query.data.vibe.comments.count}
              openReplying={true}
            />
          )}
        </div>
      </div>
      <RightSidebar />
      <Navbar />
    </div>
  );
}
