import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import VibeComponent from '../components/Vibe';
import Comment from '../components/Comment';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import { useQuery } from '../graphql';
import { ObjectId } from 'mongodb';

export function VibeOne() {
  const { id } = useParams();

  const [queryVibe] = useQuery({
    query: `
      query Vibe($id: ObjectID!) {
        vibe(id: $id) {
          id
          user {
            id
            username
            avatar
          }
          message
          replies {
            count
          }
          smiles {
            hasSmiled
            count
          }
          createdAt
        }
      }
    `,
    variables: { id: id },
  });

  const [queryComments] = useQuery({
    query: `
  query QueryComments($id: ObjectID!) {
    vibeReplies(id: $id) {
      createdAt
      id
      message
      user {
        avatar
        createdAt
        id
        username
      }
      smiles {
        hasSmiled
        count
      }
    }
  }
  `,
    variables: {
      id: id,
    },
  });

  return (
    <div className="flex pb-20 pt-28 md:pb-28 lg:pb-6">
      <LeftSidebar />
      <div id="inputs" className="mx-auto mt-8 flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          {queryVibe.data?.vibe && (
            <VibeComponent
              id={queryVibe.data.vibe.id}
              avatar={queryVibe.data.vibe.user.avatar}
              username={queryVibe.data.vibe.user.username}
              date={queryVibe.data.vibe.createdAt}
              smileCount={queryVibe.data.vibe.smiles.count}
              hasSmiled={queryVibe.data.vibe.smiles.hasSmiled}
              message={queryVibe.data.vibe.message}
              commentCount={queryVibe.data.vibe.replies.count}
              openReplying={true}
            />
          )}
        </div>
        {queryComments.data?.vibeReplies.map((comment) => (
          <Comment
            id={comment.id}
            idOP={id}
            avatar={comment.user.avatar}
            username={comment.user.username}
            usernameAuthor={queryVibe.data?.vibe?.user.username}
            date={comment.createdAt}
            smileCount={comment.smiles.count}
            hasSmiled={comment.smiles.hasSmiled}
            message={comment.message}
          />
        ))}
      </div>
      <RightSidebar />
      <Navbar />
    </div>
  );
}
