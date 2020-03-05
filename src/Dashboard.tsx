import React, { useState, useContext, useEffect } from 'react';
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
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { IUser } from './util/user';

const GET_FRIENDS = gql`
  query FriendsAndCharacters($_id: MongoID!) {
    userById(_id: $_id) {
      friends {
        _id
        username
        email
      }
      characters {
        _id
        name
        class {
          name
        }
        race {
          name
        }
      }
    }
  }
`

function Dashboard(): React.ReactElement {
  // const friendAdd = 
  // const [addingEntity, setAddingEntity] = useState('friend');
  // const [adding, setAdding] = useState(false);
  const [friends, setFriends] = useState<Array<IUser>>([]);
  const dngnContext: IDngnCntxt = useContext(DngnCntxt);
  const {loading, data} = useQuery(GET_FRIENDS, {variables: {_id: dngnContext.currentUser._id}})
  
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
