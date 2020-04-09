import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

export default function BottomBar(): React.FunctionComponentElement<JSX.Element> {
  const [route, setRoute] = useState('/');

  const handleChange = (e: React.ChangeEvent<{}>, value: string): void => {
    setRoute(value);
  }
  
  return (
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
  )
}
