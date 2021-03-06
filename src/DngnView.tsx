import React, { useContext, useMemo } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { createMuiTheme, Theme, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { DngnCntxt } from './App';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { paletteOptions } from './theme';
import Dashboard from './Dashboard';
import AuthForm from './AuthForm';
import CharacterContainer from './CharacterContainer';
import TopBar from './TopBar';
import BottomBar from './BottomBar';

const useStyles = makeStyles(theme => ({
  sheet: {
    height: '100vh',
  }
}));

/**
 * Main view component, holds everything you can see
 */
export default function DngnView(): React.ReactElement {
  const { loggedIn } = useContext(DngnCntxt);
  const prefersDarkMode: boolean = useMediaQuery('(prefers-color-scheme: dark)');
  const theme: Theme = useMemo<Theme>(
    () => createMuiTheme({
      palette: {
        ...paletteOptions,
        type: prefersDarkMode ? 'dark' : 'light',
      },
    }),
    [prefersDarkMode]
  );
  const classes = useStyles();

  const homePage: JSX.Element = loggedIn
    ? <Dashboard />
    : <AuthForm />

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.sheet} >
        <TopBar />
        <Router>
          <Switch>
            <Route path='/friends'>
            </Route>
            <Route path='/characters'>
              <CharacterContainer />
            </Route>
            <Route path='/' >
              {homePage}
            </Route>
          </Switch>
          <BottomBar />
        </Router>
      </Paper>
    </ThemeProvider>
  )
}
