import Navbar from '../components/Navbar';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import { useMutation, useQuery } from '../graphql';
import Button from '../components/Button';
import { useParams } from 'react-router-dom';
import { getFullDate, pluralString } from '../utils/format';
import { useAuthContext } from '../hooks';
import { useEffect, useMemo, useState } from 'react';
import Vibe from '../components/Vibe';
import Comment from '../components/Comment';
import Nothing from '../components/Nothing';
import { Title } from '../components/Title';
import User from '../components/User';
import Loading from '../components/Loading';

export function Profile() {
  const { username, tab } = useParams();
  const { user } = useAuthContext();

  const [queryUser] = useQuery({
    query: `query QueryUser($username: String) {
      user(username: $username) {
        avatar
        createdAt
        followers
        following
        id
        username
      }
    }
    `,
    variables: { username: username },
  });

  const profileUser = useMemo(() => {
    const dataUser = queryUser.data?.user;

    if (dataUser) {
      return {
        id: dataUser.id,
        username: dataUser.username,
        avatar: dataUser.avatar,
        createdAt: dataUser.createdAt,
        followersCount: dataUser.followers.length,
        followingCount: dataUser.following.length,
        isFollowing: dataUser.followers.map((f) => `${f}`).includes(user.id),
      };
    }
  }, [queryUser]);

  //* FOLLOW *//

  const [followMutation, executeFollow] = useMutation(
    `mutation MutationFollow($followId: ObjectID!) {
      follow(id: $followId) {
        id
      }
    }`,
  );

  const [unFollowMutation, executeUnFollow] = useMutation(
    `mutation Mutation($unfollowId: ObjectID!) {
      unfollow(id: $unfollowId) {
        id
      }
    }`,
  );

  const handleFollow = () => {
    if (profileUser?.isFollowing) {
      executeUnFollow({ unfollowId: profileUser?.id });
    } else {
      executeFollow({ followId: profileUser?.id });
    }
  };

  //* FOLLOWERS / FOLLOWING *//

  const [followersQuery, executeFollowersQuery] = useQuery({
    query: `query GetFollowers($id: ObjectID!) {
    getFollowers(id: $id) {
        id
        username
        avatar
    }
}`,
    pause: true,
    requestPolicy: 'network-only',
    variables: { id: profileUser?.id },
  });

  const [followingQuery, executeFollowingQuery] = useQuery({
    query: `query GetFollowings($id: ObjectID!) {
    getFollowings(id: $id) {
        id
        username
        avatar
    }
}`,
    pause: true,
    requestPolicy: 'network-only',
    variables: { id: profileUser?.id },
  });

  //* VIBES / COMMENTS / SMILES *//

  const [vibeTab, setVibeTab] = useState(tab?.toUpperCase() || 'VIBES');

  const [vibeQuery, executeVibeQuery] = useQuery({
    query: `query QueryVibes($userId: ObjectID!, $type: VibeType!) {
    vibes(id: $userId, type: $type) {
      id
      createdAt
      message
      replies {
        count
      }
      reply {
        id
        user {
          username
        }
      }
      smiles {
        hasSmiled
        count
      }
      user {
        avatar
        id
        username
      }
    }
  }`,
    pause: true,
    variables: { userId: profileUser?.id, type: vibeTab },
    requestPolicy: 'network-only',
  });

  useEffect(() => {
    if (!profileUser) {
      return;
    }

    switch (vibeTab) {
      case 'VIBES':
      case 'COMMENTS':
      case 'SMILES':
        followingQuery.data = undefined;
        followersQuery.data = undefined;
        return executeVibeQuery();
      case 'FOLLOWERS':
        followingQuery.data = undefined;
        vibeQuery.data = undefined;
        return executeFollowersQuery();
      case 'FOLLOWING':
        followersQuery.data = undefined;
        vibeQuery.data = undefined;
        return executeFollowingQuery();
    }
  }, [profileUser, vibeTab]);

  const handleTabClick = (tab: string) => {
    setVibeTab(tab);
    window.history.pushState(
      {},
      '',
      `/profile/${profileUser?.username}/${tab.toLowerCase()}`,
    );
  };

  return (
    <div className="flex pb-20 pt-28 md:pb-28 lg:pb-6">
      <LeftSidebar />

      {profileUser && (
        <div
          id="centerDiv"
          className="mx-auto flex w-[355px] flex-col gap-6 md:w-[600px]  "
        >
          <Title text={`${profileUser.username} – vibe`} />
          <div
            id="profileDiv"
            className="mt-8 flex flex-shrink-0 flex-col rounded-[16px] bg-white bg-opacity-90 p-5 shadow-custom md:p-6"
          >
            {/* HEADER */}

            <div className="flex">
              <img
                src={`/avatars/${profileUser.avatar}.svg`}
                alt="avatar"
                className="h-16 w-16 md:h-20 md:w-20"
              ></img>

              <div className="my-auto flex w-[90%] flex-col pt-2 pl-4 md:w-[65%]">
                <p className="font-roboto text-lg tracking-wider text-dark-grey text-opacity-80 md:text-xl lg:text-lg">
                  {profileUser.username}
                </p>
                <time className="font-roboto tracking-wider text-dark-pink md:text-lg lg:text-sm">
                  Member since {getFullDate(profileUser.createdAt)}
                </time>
                <br />
              </div>

              {/* FOLLOW BUTTON */}

              {username != user.username && (
                <div className="hidden self-start md:flex">
                  <Button
                    className="rounded-lg border-2 border-dark-pink border-opacity-70 px-4 py-2 font-roboto text-sm font-bold tracking-wider text-dark-pink shadow-custom hover:bg-gradient-to-r hover:from-pink hover:to-yellow md:text-lg lg:text-base"
                    text={profileUser.isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
                    onClick={handleFollow}
                    disabled={followMutation.fetching || unFollowMutation.fetching}
                  ></Button>
                </div>
              )}
            </div>

            <div className="flex flex-row items-center gap-4 pb-4 pl-1 md:pl-2 md:pt-4">
              {username != user.username && (
                <div className="mt-2 flex self-start md:hidden">
                  <Button
                    className="rounded-lg border-2 border-dark-pink border-opacity-70 px-4 py-2 font-roboto text-sm font-bold tracking-wider text-dark-pink shadow-custom hover:bg-gradient-to-r hover:from-pink hover:to-yellow md:text-lg lg:text-base"
                    text={profileUser.isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
                    onClick={handleFollow}
                    disabled={followMutation.fetching || unFollowMutation.fetching}
                  ></Button>
                </div>
              )}

              {/* FOLLOWERS / FOLLOWING */}

              <Button
                className={`pt-2 font-roboto text-sm tracking-wider text-dark-grey text-opacity-60 duration-100 hover:text-dark-pink md:pt-0 md:text-lg lg:text-sm ${
                  vibeTab === 'FOLLOWERS' && 'text-dark-pink'
                }`}
                text={`${profileUser.followersCount} ${pluralString(
                  profileUser.followersCount,
                  'follower',
                )}`}
                onClick={() => handleTabClick('FOLLOWERS')}
              ></Button>

              <Button
                className={`pt-2 font-roboto text-sm tracking-wider text-dark-grey text-opacity-60 duration-100 hover:text-dark-pink md:pt-0 md:text-lg lg:text-sm ${
                  vibeTab === 'FOLLOWING' && 'text-dark-pink'
                }`}
                text={`${profileUser.followingCount} following`}
                onClick={() => handleTabClick('FOLLOWING')}
              ></Button>
            </div>

            {/* VIBES / COMMENTS / SMILES  */}

            <div className="flex items-center gap-4 px-2">
              <Button
                className={`font-mincho text-dark-grey text-opacity-70 duration-100 hover:text-dark-pink md:text-xl lg:text-base ${
                  vibeTab === 'VIBES' && 'text-dark-pink'
                }`}
                text="vibes"
                onClick={() => handleTabClick('VIBES')}
              />

              <div className="mx-4 h-4 w-[1px] bg-dark-grey bg-opacity-50"></div>

              <Button
                className={`font-mincho text-dark-grey text-opacity-70 duration-100 hover:text-dark-pink md:text-xl lg:text-base ${
                  vibeTab === 'COMMENTS' && 'text-dark-pink'
                }`}
                text="comments"
                onClick={() => handleTabClick('COMMENTS')}
              />

              <div className="mx-2 h-4 w-[1px] bg-dark-grey bg-opacity-50"></div>

              <Button
                className={`font-mincho text-dark-grey text-opacity-70 duration-100 hover:text-dark-pink md:text-xl lg:text-base ${
                  vibeTab === 'SMILES' && 'text-dark-pink'
                }`}
                text="smiles"
                onClick={() => handleTabClick('SMILES')}
              />
            </div>
          </div>

          <div id="inputs" className="flex flex-col gap-6">
            {vibeQuery.data?.vibes.length ? (
              vibeQuery.data?.vibes?.map((vibe) => {
                if (vibeTab === 'COMMENTS' && vibe.reply?.id) {
                  return (
                    <Comment
                      key={`${vibe.id}`}
                      id={vibe.id}
                      idOP={`${vibe.reply!.id}`}
                      avatar={vibe.user.avatar}
                      username={vibe.user.username}
                      usernameAuthor={vibe.reply?.user.username}
                      date={vibe.createdAt}
                      smileCount={vibe.smiles.count}
                      hasSmiled={vibe.smiles.hasSmiled}
                      message={vibe.message}
                    />
                  );
                }

                return (
                  <Vibe
                    id={vibe.id}
                    key={`${vibe.id}`}
                    avatar={vibe.user.avatar}
                    username={vibe.user.username}
                    date={vibe.createdAt}
                    smileCount={vibe.smiles.count}
                    hasSmiled={vibe.smiles.hasSmiled}
                    message={vibe.message}
                    commentCount={vibe.replies.count}
                  />
                );
              })
            ) : followersQuery.data?.getFollowers.length ? (
              followersQuery.data?.getFollowers.map((follower: any) => {
                return (
                  <div className="rounded-[16px] bg-white shadow-custom">
                    <User
                      key={`${follower.id}`}
                      avatar={follower.avatar}
                      username={follower.username}
                    />
                  </div>
                );
              })
            ) : followingQuery.data?.getFollowings.length ? (
              followingQuery.data?.getFollowings.map((following: any) => {
                return (
                  <div className="rounded-[16px] bg-white shadow-custom">
                    <User
                      key={`${following.id}`}
                      avatar={following.avatar}
                      username={following.username}
                    />
                  </div>
                );
              })
            ) : !vibeQuery.data?.vibes.length &&
              !vibeQuery.fetching &&
              !followersQuery.data?.getFollowers?.length &&
              !followersQuery.fetching &&
              !followingQuery.data?.getFollowings?.length &&
              !followingQuery.fetching ? (
              <Nothing />
            ) : (
              <Loading />
            )}
          </div>
        </div>
      )}

      <RightSidebar />
      <Navbar />
    </div>
  );
}
