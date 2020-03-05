import React, { useState, createContext } from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './apolloClient';
import DngnView from './DngnView';

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

/**
 * Highest level component
 */
const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  return (
    <ApolloProvider client={client} >
      <DngnCntxt.Provider value={{
        loggedIn, setLoggedIn,
        currentUser, setCurrentUser,
      }}>
      <DngnView />
    </DngnCntxt.Provider>
  </ApolloProvider>
  );
}

export default App;
