export const Comments = `
  query Comments($vibeId: ObjectID!) {
    comments(id: $vibeId) {
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
      createdAt
    }
  }
`;

export const Followers = `
  query Followers($id: ObjectID!) {
    followers(id: $id) {
      id
      username
      avatar
    }
  }
`;

export const Following = `
  query Following($id: ObjectID!) {
    following(id: $id) {
        id
        username
        avatar
    }
  }
`;

export const Friends = `
  query Friends {
    friends {
      id
      username
      avatar
    }
  }
`;

export const Me = `
  query Me {
    me {
      id
      username
      avatar
      email
    } 
  }
`;

export const Timeline = `
  query Timeline {
    timeline {
      vibes {
        id
        replies {
          count
        }
        createdAt
        message
        smiles {
          count
          hasSmiled
        }
        user {
          username
          avatar
        }
      }
    }
  }
`;

export const User = `
  query User($username: String) {
    user(username: $username) {
      avatar
      createdAt
      followers
      following
      id
      username
    }
  }
`;

export const Users = `
  query Users($query: String!) {
    users(query: $query) {
      id
      username
      avatar
    }
  }
`;

export const Vibe = `
  query Vibe($vibeId: ObjectID!) {
    vibe(id: $vibeId) {
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
`;

export const Vibes = `
  query Vibes($userId: ObjectID!, $type: VibeType!) {
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
  }
`;
