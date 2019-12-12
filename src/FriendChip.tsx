import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ChipProp } from './DashList';

function FriendChip(props: ChipProp) {
  return (
      <Card>
        <CardHeader>
          <Typography variant='h6' >{props.name}</Typography>

        </CardHeader>
      </Card>
  )
}

export default FriendChip;
