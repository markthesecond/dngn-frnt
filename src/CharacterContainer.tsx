import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from 'react-router-dom';
import CharacterCreator from './CharacterCreator';

/**
 * Holds all character related views
 */
function CharacterContainer(): React.ReactElement {

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
