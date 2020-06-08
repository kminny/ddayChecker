import gql from 'graphql-tag';

export const GET_MESSAGES = gql`
  query getMessages {
    getMessages {
      ok
      messages {
        id
        message
        name
        createdAt
        updatedAt
      }
      error
    }
  }
`;

export const UPLOAD_MESSAGE = gql`
  mutation uploadMessage($message: String!, $name: String!) {
    uploadMessage(message: $message, name: $name) {
      ok
      message {
        id
        message
        name
        createdAt
      }
      error
    }
  }
`;

export const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription newMessageSubscription {
    newMessageSubscription {
      id
      message
      name
      createdAt
    }
  }
`;
