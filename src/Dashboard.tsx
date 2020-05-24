import React, { useState, useContext, useEffect } from 'react';
import { DngnCntxt, IDngnCntxt } from './App';
import {
  Link
} from 'react-router-dom';
import DashList from './DashList';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { useQuery } from '@apollo/react-hooks';
import { IUser } from './util/user';
import { GET_FRIENDS } from './graphql/userQueries';

function Dashboard(): React.ReactElement {
  const [friends, setFriends] = useState<Array<IUser>>([]);
  const dngnContext: IDngnCntxt = useContext(DngnCntxt);
  const {loading, data} = useQuery(
    GET_FRIENDS,
    { variables: { _id: dngnContext.currentUser._id } }
  );
  
  useEffect(() => {
    if (data) setFriends(data.userById.friends)
  }, [data, friends]);
  if (loading) {
    return <>Loading...</>
  }

  return (
    <Paper>
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
          <DashList characters={data.userById.characters} />
          <Typography
            variant='h4' >
              Friends
              <IconButton aria-label="add"><AddIcon /></IconButton>
          </Typography>
          <DashList friends={data.userById.friends} />
        </Paper> 
      </Container>
    </Paper>
  )
}

export default Dashboard;
