import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { USER_LOGOUT } from './graphql/authQueries';
import { DngnCntxt } from './App';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    // paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
  },
  authButton: {
    marginLeft: 'auto',
  },
  homeButton: {
    textTransform: 'none',
    color: '#fff',
  },
}));

/**
 * A branded bar with a user actions
 */
export default function TopBar(): React.ReactElement {
  const classes = useStyles();
  const [ logout ] = useMutation(USER_LOGOUT);
  const { loggedIn, setLoggedIn, setCurrentUser } = useContext(DngnCntxt);

  const handleLogout = async (): Promise<void> => {
    localStorage.removeItem('token');
    // unset user related state locally
    setLoggedIn(false);
    setCurrentUser({ username: '', _id: '' });
    // give server time to destroy the session
    await logout();
  }

  const logoutButton = loggedIn
    ? <Button
        onClick={ handleLogout }
        className={ classes.authButton } >
        Logout
      </Button>
    : null // don't show a button if not logged in

  return (
    <div className={ classes.root } >
      <AppBar position='static'>
        <Toolbar className={ classes.toolbar } >
          <Button children={
            <Typography
              variant='h4' >
              DngnBddy
            </Typography> }
            variant='outlined'
            href='/'
            className={ classes.homeButton } />
          { logoutButton }
        </Toolbar>
      </AppBar>
    </div>
  )
}
