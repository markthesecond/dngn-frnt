import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import authLink from './authLink';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message ${message}, Location: ${locations}, Path: ${path}`,
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    authLink,
    new HttpLink({
      uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
      credentials: 'include',
    }),
  ]),  
  cache: new InMemoryCache(),
});

export default client
