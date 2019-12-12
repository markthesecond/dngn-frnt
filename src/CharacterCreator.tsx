import React, { createContext, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import { CharacterModel } from './util/character';
import { Typography } from '@material-ui/core';

export interface ICreationContext {
  // stages: Set<string>,
  currentStage: string,
  charChoices: CharacterModel
}

const initialContext: ICreationContext = {
  // stages: new Set(),
  currentStage: 'Intro',
  charChoices: {}
}

const stages = [
  'Intro','Race','Class','Abilities','Items','Spells','Summary'
]
// const CreationContext:React.Context<ICreationContext> =
//  createContext<ICreationContext>(initialContext);

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

interface TPProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TPProps) {
  const { children, index, value, ...other } = props;

  return (
    <Paper
      hidden={value !== index}
      {...other} >
      <Typography variant='h5' >
        {stages[index]}
        {value === index && <Box p={3} >{children}</Box>}
      </Typography>
    </Paper>
  )
}

function CharacterCreator(): any {
  const [currentStage,setCurrentStage] = useState(0);

  const handleChange = (e: React.ChangeEvent<{}>, newStage: number) => {
    setCurrentStage(newStage);
  }

  const tabs = stages.map((s,i) => <Tab key={i} label={stages[i]} value={i} {...a11yProps(i)}/>);
  // const screens = stages.map((s,i) => );
  
  // const panels = stages.map()

  return (
    <Paper>
      <Grid
        container
        spacing={4} >
        <Grid item xs={12} >
          <Box >
            <AppBar position='static' color='default' >
              <Tabs
                value={currentStage}
                onChange={handleChange} >
                  {tabs}
              </Tabs>
            </AppBar>
            
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default CharacterCreator;
