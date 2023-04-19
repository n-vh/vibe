export const AddComment = `
  mutation AddComment($vibeId: ObjectID!, $message: String!) {
    addComment(id: $vibeId, message: $message) {
      id
    }
  }
`;

export const AddFollow = `
  mutation AddFollow($id: ObjectID!) {
    addFollow(id: $id) {
      id
    }
  }
`;

export const AddSmile = `
  mutation AddSmile($vibeId: ObjectID!) {
    addSmile(id: $vibeId) {
      id
    }
  }
`;

export const CreateVibe = `
  mutation CreateVibe($message: String!){
    createVibe(message: $message) {
      id
      message
      createdAt
    }
  }
`;

export const DeleteVibe = `
  mutation DeleteVibe($vibeId: ObjectID!) {
    deleteVibe(id: $vibeId) {
      id
    }
  }
`;

export const RemoveFollow = `
  mutation RemoveFollow($id: ObjectID!) {
    removeFollow(id: $id) {
      id
    }
  }
`;

export const RemoveSmile = `
  mutation RemoveSmile($vibeId: ObjectID!) {
    removeSmile(id: $vibeId) {
      id
    }
  }
`;

export const ModifySettings = `
  mutation ModifySettings($input: ModifySettingsInput!){
    modifySettings(input: $input) {
        id
    }
  }
`;
