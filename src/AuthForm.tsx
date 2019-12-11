import React, { ReactElement, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { async } from 'q';

function AuthForm(props: any): ReactElement {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signedUp, setSignedUp] = useState(true);
  const handleClick = () => {setSignedUp(!signedUp)};

  const register = async () => {
    const authQuery = {
      "query": `mutation {
        userRegister(username: "${username}", email: "${email}", password: "${password}") {
          user {
            username
            _id
            password
          }
          token
        }
      }`
    }
    const authResponse = await fetch('http://localhost:3080/graphql', {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(authQuery)
    })
    const parsedAuth = await authResponse.json();

    console.log(parsedAuth)
    if (parsedAuth.data.userRegister.user) {
      props.setCurrentUser(parsedAuth.data.userRegister.user);
      props.setJwt(parsedAuth.data.userRegister.token);
      props.setLoggedIn(true);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signedUp) {

    } else {
      register();
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
