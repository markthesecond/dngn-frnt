import React, { useState, createContext } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import Dashboard from './Dashboard';
import AuthForm from './AuthForm';
import CharacterContainer from './CharacterContainer';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import client from './apolloClient';

export interface CurrentUser {
  username?: string,
  _id?: string,
}

export interface IDngnCntxt {
  loggedIn?: boolean,
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  currentUser: CurrentUser,
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>,
}

const dummyContext = {
  loggedIn: false,
  setLoggedIn: () => {},
  currentUser: {
    username: '',
    _id: '',
  },
  setCurrentUser: () => {},
}

export const DngnCntxt: React.Context<IDngnCntxt> = createContext<IDngnCntxt>({...dummyContext});

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const homePage = loggedIn
    ? <Dashboard />
    : <AuthForm />

  return (
    <ApolloProvider client={client} >
      <DngnCntxt.Provider value={{
        loggedIn, setLoggedIn,
        currentUser, setCurrentUser,
      }}>
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
    </DngnCntxt.Provider>
  </ApolloProvider>
  );
}

export default App;
