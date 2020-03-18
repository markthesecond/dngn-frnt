import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CharacterModel } from './util/character';
import CreationIntro from './CreationIntro';
import CreationRace from './CreationRace'
import CreationClass from './CreationClass';
import CreationAbilities from './CreationAbilities';
import CreationSummary from './CreationSummary';

export interface ICreationContext {
  // stages: Set<string>,
  currentStage: string,
  charChoices: CharacterModel
}

const stages = [
  'Intro', 'Race', 'Class', 'Abilities', 'Summary'
]

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

/** Interface for TabPanel props */
interface TPProps {
  children?: React.ReactNode;
  /** required */
  index: number;
  /** indicates an index to show; all panels should agree */
  value: number;
  /** should change the {TPProps.value} to a lower index */
  back?: () => void;
  /** should change the value to a higher index */
  forward?: () => void;
}


function TabPanel(props: TPProps) {
  const { children, index, value, back, forward, ...other } = props;
  const backButton = <Button color='secondary' onClick={back} >Back</Button>
  const nextButton = <Button color='primary' onClick={forward} >Next</Button>
  return (
    <Paper
    hidden={value !== index}
    {...other} >
      <Typography variant='h5' >
        {stages[index]}
        {value === index && <Box p={3}  >{children}</Box>}
      </Typography>
      {backButton}
      {nextButton}
    </Paper>
  )
}

/**
 * A series of related panels that lead through character creation
 */
function CharacterCreator(): React.ReactElement {
  const [currentStage,setCurrentStage] = useState(0);
  const [charChoices, setChoice] = useState<CharacterModel>({})
  const handleChange = (e: React.ChangeEvent<{}>, newStage: number) => {
    setCurrentStage(newStage);
  }
  
  const goBack = () => {
    if (currentStage) setCurrentStage(currentStage - 1);
  }
  
  const goForward = () => {
    if (!(currentStage === stages.length - 1)) setCurrentStage(currentStage + 1);
  }

  const tabs = stages.map((s,i) => <Tab key={i} label={stages[i]} value={i} {...a11yProps(i)}/>);

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
            <TabPanel value={currentStage} index={0} back={goBack} forward={goForward} >
              <CreationIntro />
            </TabPanel>
            <TabPanel value={currentStage} index={1} back={goBack} forward={goForward} >
              <CreationRace choices={charChoices} setChoices={setChoice} />
            </TabPanel>
            <TabPanel value={currentStage} index={2} back={goBack} forward={goForward} >
              <CreationClass choices={charChoices} setChoices={setChoice} />
            </TabPanel>
            <TabPanel value={currentStage} index={3} back={goBack} forward={goForward} >
              <CreationAbilities choices={charChoices} setChoices={setChoice} />
            </TabPanel>
            <TabPanel value={currentStage} index={4} back={goBack} forward={goForward} >
              <CreationSummary choices={charChoices} setChoices={setChoice} />
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default CharacterCreator;
