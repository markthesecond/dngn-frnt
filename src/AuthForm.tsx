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
  const [login] = useMutation(LOGIN);
  const [register] = useMutation(REGISTER);
  const handleClick = () => {setSignedUp(!signedUp)};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signedUp) {
      await login({ variables: { email, password }})
        .then(l => {
          handleLogin(l.data.userLogin);
        });
      } else {
        register({ variables: { username, email, password }})
        .then(r => {
          handleLogin(r.data.userRegister);
        });
      }
    }
    
  const handleLogin = (login: any): void => {
    setUsername('');
    setEmail('');
    setPassword('');
    props.setCurrentUser(login.user);
    props.setJwt(login.token);
    props.setLoggedIn(Boolean(login.token));
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
