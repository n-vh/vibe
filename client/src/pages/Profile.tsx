import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Mutation, Query, useMutation, useQuery } from '../graphql';
import { getFullDate, pluralString } from '../utils/format';
import { useAuthContext } from '../hooks';
import { Title } from '../components/Title';
import Navbar from '../components/Navbar';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import Button from '../components/Button';
import Vibe from '../components/Vibe';
import Comment from '../components/Comment';
import Nothing from '../components/Nothing';
import User from '../components/User';
import Loading from '../components/Loading';

export function Profile() {
  const { username, tab } = useParams();
  const { user } = useAuthContext();

  const [userQuery] = useQuery({
    query: Query.User,
    variables: { username: username },
  });

  const profileUser = useMemo(() => {
    const dataUser = userQuery.data?.user;

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
  }, [userQuery]);

  //* FOLLOW *//

  const [addFollow, executeAddFollow] = useMutation(Mutation.AddFollow);
  const [removeFollow, executeRemoveFollow] = useMutation(Mutation.RemoveFollow);

  const handleFollow = () => {
    if (profileUser?.isFollowing) {
      executeRemoveFollow({ id: profileUser?.id });
    } else {
      executeAddFollow({ id: profileUser?.id });
    }
  };

  //* FOLLOWERS / FOLLOWING *//

  const [followersQuery, executeFollowersQuery] = useQuery({
    query: Query.Followers,
    pause: true,
    requestPolicy: 'network-only',
    variables: { id: profileUser?.id },
  });

  const [followingQuery, executeFollowingQuery] = useQuery({
    query: Query.Following,
    pause: true,
    requestPolicy: 'network-only',
    variables: { id: profileUser?.id },
  });

  //* VIBES / COMMENTS / SMILES *//

  const [vibeTab, setVibeTab] = useState(tab?.toUpperCase() || 'VIBES');

  const [vibeQuery, executeVibeQuery] = useQuery({
    query: Query.Vibes,
    pause: true,
    variables: { userId: profileUser?.id, type: vibeTab },
    requestPolicy: 'network-only',
  });

  useEffect(() => {
    if (!profileUser) {
      return;
    }

    followersQuery.data = undefined;
    followingQuery.data = undefined;
    vibeQuery.data = undefined;

    switch (vibeTab) {
      case 'VIBES':
      case 'COMMENTS':
      case 'SMILES':
        return executeVibeQuery();
      case 'FOLLOWERS':
        return executeFollowersQuery();
      case 'FOLLOWING':
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
                    disabled={addFollow.fetching || removeFollow.fetching}
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
                    disabled={addFollow.fetching || removeFollow.fetching}
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
            ) : followersQuery.data?.followers.length ? (
              followersQuery.data?.followers.map((follower: any) => {
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
            ) : followingQuery.data?.following.length ? (
              followingQuery.data?.following.map((following: any) => {
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
              !followersQuery.data?.followers?.length &&
              !followersQuery.fetching &&
              !followingQuery.data?.following?.length &&
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
