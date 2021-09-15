import { gql } from '@apollo/client';

export const GET_FRIENDS = gql`
  query FriendsAndCharacters($_id: MongoID!) {
    userById(_id: $_id) {
      friends {
        _id
        username
        email
      }
      characters {
        _id
        name
        class {
          name
        }
        race {
          name
        }
      }
    }
  }
`
