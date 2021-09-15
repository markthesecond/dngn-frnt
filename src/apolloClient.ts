import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  from,
  HttpLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import authLink from './authLink';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
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
