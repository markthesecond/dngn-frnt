import React, { ReactElement, useState, useEffect, useContext } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { DngnCntxt } from './App';
import { LOGIN, REGISTER, ME } from './graphql/authQueries';

function AuthForm(props: any): ReactElement {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signedUp, setSignedUp] = useState(true);
  const [login] = useMutation(LOGIN);
  const [register] = useMutation(REGISTER);
  const { data } = useQuery(ME);
  const { setCurrentUser, setLoggedIn } = useContext(DngnCntxt);

  const handleClick = () => {setSignedUp(!signedUp)};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signedUp) {
      login({ variables: { email, password }})
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
    // clear form
    setUsername('');
    setEmail('');
    setPassword('');
    // save user info into state
    setCurrentUser(login.user);
    // save the token from the login to local storage
    localStorage.setItem('token', login.token);
    setLoggedIn(Boolean(login.user.username));
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

  useEffect(
    () => {
      if (data && data.me) {
        setCurrentUser({
          ...data.me
        });
        setLoggedIn(Boolean(data.me.username));
      }
    }
  );

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
