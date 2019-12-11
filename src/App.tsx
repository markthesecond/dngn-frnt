import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Dashboard from './Dashboard';
import AuthForm from './AuthForm';

const App: React.FC = () => {
  const [route, setRoute] = useState('/');
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [jwt, setJwt] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLButtonElement>): void => {
    setRoute(e.target.value);
  }

  const homePage = loggedIn
    ? <Dashboard />
    : <AuthForm
        setLoggedIn={setLoggedIn}
        setCurrentUser={setCurrentUser}
        setJwt={setJwt} />

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/friends'>
          </Route>
          <Route path='/characters'>
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
    </div>
  );
}

export default App;
