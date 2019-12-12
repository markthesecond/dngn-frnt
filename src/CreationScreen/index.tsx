import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function CreationScreen(props: any) {
  const options: Array<any> = props.options ? props.options : null;
  const optEls = options.map((o,i) => <option key={i} value={o._id}>{o.name}</option>)

  return (
    <Card>
      <CardHeader>
        <Typography variant='h5' ></Typography>
      </CardHeader>
      <CardContent >
        <Select
          native
          inputProps={{
            name: 'selector'
          }}
           >
            <option value='' />
            {optEls}
        </Select>
      </CardContent>
      <CardActions>
        {/* <CardAction>
          <Button>

          </Button>
        </CardAction> */}
      </CardActions>
    </Card>
  )
}
