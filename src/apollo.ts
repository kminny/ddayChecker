import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, concat, split, Operation } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: 'http://15.164.34.39:5000/graphql',
});

/**
 *  check before deploy
 *  everytime to server domain
 */
const wsLink = new WebSocketLink({
  uri: 'ws://15.164.34.39:5000/subscriptions',
  options: {
    reconnect: true,
  },
});

const authMiddleware = new ApolloLink((operation: Operation, forward: any) => {
  operation.setContext({
    headers: {},
  });
  return forward(operation);
});

const combinedLinks = split(
  ({ query }) => {
    const { kind, operation }: any = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, path }) => {
      console.log(`GraphQL error: ${message}`);
      console.log(`GraphQL error on: ${path}`);
      return null;
    });
  }
  if (networkError) {
    console.log(`Network error: ${networkError}`);
  }
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, concat(authMiddleware, combinedLinks)]),
});

export default client;
