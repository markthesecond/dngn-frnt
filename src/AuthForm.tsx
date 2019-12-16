import React, { ReactElement, useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

AuthForm.fragments = {
  userInfo: gql`
    fragment userInfo on User {
      _id
      username
      email
    }
  `
}

const LOGIN = gql`
  mutation UserLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      user {
        ...userInfo
      }
      token
    }
  }
  ${AuthForm.fragments.userInfo}
`

const REGISTER = gql`
  mutation UserRegister($username: String, $email: String!, $password: String!) {
    userRegister(username: $username, email: $email, password: $password) {
      user {
        ...userInfo
      }
      token
    }
  }
  ${AuthForm.fragments.userInfo}
`

function AuthForm(props: any): ReactElement {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signedUp, setSignedUp] = useState(true);
  const [login, { loading, data }] = useMutation(LOGIN);
  const [register, { data: regData }] = useMutation(REGISTER);
  const handleClick = () => {setSignedUp(!signedUp)};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signedUp) {
      login({ variables: { email, password }});
      setUsername('');
      setEmail('');
      setPassword('');
      if (loading) {
        console.log('loading',loading);
      }
      console.log(data)
    } else {
      register({ variables: { username, email, password }});
    }
  }

  const usernameField = signedUp
    ? null
    : <TextField
        label='Username'
        type='username'
        name='username'
        value={username}
        onChange={(e) => setUsername(e.target.value)} />
  const authSwitchText = signedUp
    ? <>Need an account Click <span onClick={handleClick}>here</span>.</>
    : <>Already signed up? Click <span onClick={handleClick}>here</span>.</>

  const response: any = {};
  // wait for data to return from a login or registration
  response.user = data
    ? data.userLogin.user
    : props.currentUser
  response.token = data
    ? data.userLogin.token
    : props.jwt
  response.user = regData
    ? regData.userRegister.user
    : props.currentUser
  response.token = regData
    ? regData.userRegister.token
    : props.jwt
  // update state when data loads
  // and do it on the top level as to not confuse the hooks
  props.setCurrentUser(response.user);
  props.setJwt(response.token);
  props.setLoggedIn(Boolean(response.token));
  return (
    <Paper>
      <Typography variant='h4'>Sign {signedUp ? 'In' : 'Up'}</Typography>
      <Box component='form'onSubmit={handleSubmit} >
        {usernameField}<br/>
        <TextField
          label='Email'
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)} /><br/>
        <TextField
          label='Password'
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)} /><br/>
        <Button
          type='submit'
          color='primary'
          variant='contained' >
          {signedUp ? 'Log In' : 'Register'}
        </Button>
      </Box>
      <Typography variant='subtitle1'>{authSwitchText}</Typography>
    </Paper>
  )
}

export default AuthForm;
