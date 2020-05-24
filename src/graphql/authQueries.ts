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

export const LOGIN = gql`
  mutation UserLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      user {
        ...userInfo
      }
      token
    }
  }
  ${fragments.userInfo}
`

export const REGISTER = gql`
  mutation UserRegister($username: String, $email: String!, $password: String!) {
    userRegister(username: $username, email: $email, password: $password) {
      user {
        ...userInfo
      }
      token
    }
  }
  ${fragments.userInfo}
`

export const ME = gql`
  query Me {
    me {
      ...userInfo
    }
  }
  ${fragments.userInfo}
`
