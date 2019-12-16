import React, { /*useState, */useContext, useEffect } from 'react';
import { DngnCntxt, IDngnCntxt } from './App';
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link
} from 'react-router-dom';
import DashList from './DashList';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
// import { IUser } from './util/user';

function Dashboard(): React.ReactElement {
  // const friendAdd = 
  // const [addingEntity, setAddingEntity] = useState('friend');
  // const [adding, setAdding] = useState(false);
  // const [friends, setFriends] = useState<Array<IUser>>([]);
  const dngnContext: IDngnCntxt = useContext(DngnCntxt);
  
  useEffect(() => {
    
  });

  return (
    <>
      <Typography variant='h2' >{dngnContext.currentUser.username}'s Dash</Typography>
      <Container>
        <Paper>
          <Typography
            variant='h4' >
            Characters
            <IconButton
              aria-label="add"
              component={Link}
              to='/characters/new' >
              <AddIcon />
            </IconButton>
          </Typography>
          <DashList />
          <Typography
            variant='h4' >
              Friends
              <IconButton aria-label="add"><AddIcon /></IconButton>
          </Typography>
          <DashList />
          {/* <Typography
            variant='h4' >
            Groups
            <IconButton aria-label="add"><AddIcon /></IconButton>
          </Typography>
          <DashList /> */}
        </Paper> 
      </Container>
    </>
  )
}

export default Dashboard;
