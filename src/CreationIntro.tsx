import React from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

/**
 * Panel introducing the creator and the ideas therein
 */
function CreationIntro() {
  const description = `On the following panels, you'll make choices that \
    determine what your character will be like. Your choices will be saved \
    automatically when you make them, so click Back and Next freely.
    Click Next when you're ready to proceed.`

  return(
    <Paper>
      <Card>
        <Typography variant='body1' >
          {description}
        </Typography>
      </Card>
    </Paper>
  )
}

export default CreationIntro;
