import React, { useEffect } from 'react';
import User from './User';
import { useQuery } from '../graphql';
import { useAuthContext } from '../hooks';
import Nothing from './Nothing';

const RightSidebar: React.FC = () => {
  const [friendsQuery] = useQuery({
    query: `query GetFriends {
    getFriends {
        id
        username
        avatar
    }
}`,
    requestPolicy: 'network-only',
  });

  return (
    <div className="fixed right-0 mt-8 hidden w-[333px] rounded-l-[16px] bg-white bg-opacity-90 shadow-custom lg:block">
      <div className="flex flex-col items-start pl-12 pt-10">
        <p className="pl-4 pb-4 font-roboto text-xl font-bold tracking-wider text-blue ">
          FRIENDS
        </p>
        <div className="flex flex-col pb-8">
          {friendsQuery.data?.getFriends.length ? (
            friendsQuery.data?.getFriends.map((friend: any) => {
              return (
                <User
                  key={`${friend.id}`}
                  avatar={friend.avatar}
                  username={friend.username}
                />
              );
            })
          ) : (
            <Nothing />
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
