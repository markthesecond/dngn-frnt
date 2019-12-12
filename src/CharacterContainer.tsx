import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from 'react-router-dom';
import CharacterCreator from './CharacterCreator';

function CharacterContainer() {

  return (
    <Router>
      <Switch>
        <Route path='/characters/new'>
          <CharacterCreator />
        </Route>
        <Route path='/characters'>
          <h1>Guh</h1>
        </Route>
      </Switch>
    </Router>
  )
}

export default CharacterContainer;
