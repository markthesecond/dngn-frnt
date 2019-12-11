import React from 'react';
import DashList from './DashList';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

function Dashboard(): React.ReactElement {
  return (
    <>
      <Typography variant='h2' >Dngn Dash</Typography>
      <Container>
        <Paper>
          <Typography
            variant='h4' >
            Characters
            <IconButton aria-label="add"><AddIcon /></IconButton>
          </Typography>
          <DashList />
          <Typography
            variant='h4' >
              Friends
              <IconButton aria-label="add"><AddIcon /></IconButton>
          </Typography>
          <DashList />
          <Typography
            variant='h4' >
            Groups
            <IconButton aria-label="add"><AddIcon /></IconButton>
          </Typography>
          <DashList />
        </Paper> 
      </Container>
    </>
  )
}

export default Dashboard;
