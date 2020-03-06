import gql from 'graphql-tag';

const fragments = {
  userInfo: gql`
    fragment userInfo on User {
      _id
      username
      email
    }
  `
}

export const USER_LOGOUT = gql`
  mutation UserLogout {
    userLogout {
      user {
        ...userInfo
      }
      token
    }
  }
  ${fragments.userInfo}
`
