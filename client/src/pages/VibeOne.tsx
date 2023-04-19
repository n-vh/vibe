import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Query, useQuery } from '../graphql';
import { Title } from '../components/Title';
import Navbar from '../components/Navbar';
import VibeComponent from '../components/Vibe';
import Comment from '../components/Comment';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';

export function VibeOne() {
  const { id } = useParams();

  const [vibeQuery] = useQuery({
    query: Query.Vibe,
    variables: {
      vibeId: id,
    },
  });

  const [commentsQuery, executeCommentsQuery] = useQuery({
    query: Query.Comments,
    variables: {
      vibeId: id,
    },
    requestPolicy: 'network-only',
  });

  useEffect(() => {
    executeCommentsQuery();
  }, [vibeQuery.data]);

  return (
    <div className="flex pb-20 pt-28 md:pb-28 lg:pb-6">
      <LeftSidebar />
      <div
        id="inputs"
        className="mx-auto mt-8 flex w-[355px] flex-col gap-6 md:w-[500px]"
      >
        <div className="flex flex-col gap-6">
          {vibeQuery.data?.vibe && (
            <>
              <Title text={`${vibeQuery.data.vibe.user.username}'s vibe`} />
              <VibeComponent
                id={vibeQuery.data.vibe.id}
                avatar={vibeQuery.data.vibe.user.avatar}
                username={vibeQuery.data.vibe.user.username}
                date={vibeQuery.data.vibe.createdAt}
                smileCount={vibeQuery.data.vibe.smiles.count}
                hasSmiled={vibeQuery.data.vibe.smiles.hasSmiled}
                message={vibeQuery.data.vibe.message}
                commentCount={vibeQuery.data.vibe.replies.count}
                openReplying={true}
              />
            </>
          )}
        </div>
        {commentsQuery.data?.comments.map((comment) => (
          <Comment
            id={comment.id}
            idOP={id}
            avatar={comment.user.avatar}
            username={comment.user.username}
            usernameAuthor={vibeQuery.data?.vibe?.user.username}
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
