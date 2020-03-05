import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';

const authLink: ApolloLink = setContext((_, { headers }) => {
  // read the auth token from local storage
  const token = localStorage.getItem('token');
  // if a token was found, add it to the headers
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export default authLink;
