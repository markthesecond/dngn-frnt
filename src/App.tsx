import React, { useState, createContext } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Dashboard from './Dashboard';
import AuthForm from './AuthForm';
import CharacterContainer from './CharacterContainer';

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

const client: ApolloClient<any> = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache({
    addTypename: false
  }),
  credentials: 'include'
});

const App: React.FC = () => {
  const [route, setRoute] = useState('/');
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});


  const handleChange = (e: React.ChangeEvent<HTMLButtonElement>): void => {
    setRoute(e.target.value);
  }

  const homePage = loggedIn
    ? <Dashboard />
    : <AuthForm />

  return (
    <ApolloProvider client={client} >
      <DngnCntxt.Provider value={{
        loggedIn, setLoggedIn,
        currentUser, setCurrentUser,
      }}>
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
          <BottomNavigation
            value={route}
            onChange={handleChange}
            showLabels>
            <BottomNavigationAction
              to='/'
              label='Dashboard'
              value='/'
              component={Link} />
            <BottomNavigationAction
              to='/friends'
              label='Friends'
              value='/friends'
              component={Link} />
            <BottomNavigationAction
              to='/characters'
              label='Characters'
              value='/characters'
              component={Link} />
          </BottomNavigation>
        </Router>
    </DngnCntxt.Provider>
  </ApolloProvider>
  );
}

export default App;
