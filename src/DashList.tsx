import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Button from '@material-ui/core/Button';
// import { gql } from 'apollo-boost';

export interface ChipProp {
  name: string,
  icon: React.ReactNode
}

// const REMOVE_FRIEND = gql`
//   mutation RemoveFriend {
//     userUpdateOne(record: {friends}) {
      
//     }
//   }
// `

function DashList({friends, characters}: any) {
  const friendChips = friends
    ? friends.map((f: any) => (
        <Grid key={f._id} item xs={2} >
          <Card>
            <CardHeader title={f.name ? f.name : f.username} />
            <CardContent>
              {f.email ? f.email : f.class}
              {f.race ? f.race : null}
            </CardContent>
            <CardActions>
              {/* <Button 
                color='secondary'>
                Delete
              </Button> */}
            </CardActions>
          </Card>
        </Grid>
      ))
    : null

  const charChips = characters
    ? characters.map((f: any) => (
        <Grid key={f._id} item xs={2} >
          <Card>
            <CardHeader title={f.username ? f.username : f.name} />
            <CardContent>
              {f.email ? f.email : null}
              {f.race ? f.race : null}
            </CardContent>
            <CardActions>
              {/* <Button 
                color='secondary'
                onClick >
                Delete
              </Button> */}
            </CardActions>
          </Card>
        </Grid>
      ))
    : null

  return (
    <Grid container >
      {friendChips}
      {charChips}
    </Grid>
  )
}

export default DashList;
