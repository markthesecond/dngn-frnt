import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import AbilitySelect from './AbilitySelect';
import { IAbilities } from './util/character';

interface Abilities {
  STR?: number | null,
  DEX?: number,
  CON?: number,
  INT?: number,
  WIS?: number,
  CHA?: number
}

function CreationAbilities({choices, setChoices}: any) {
  const classDescription = `Your character's class describes how they interact 
    with their surroundings and make their living in the world. In game terms, 
    your class (or classes) control your health and how you overcome obstacles`
  const [description] = useState<string>(classDescription);
  const [abilities, setAbilities] = useState<Abilities>({})
  const [scores] = useState<Array<number>>([15,14,13,12,10,8])
  const abilityNames = ['STR','DEX','CON','INT','WIS','CHA'];
  const handleAbilityChange = (event: React.ChangeEvent<{name: string | undefined, value: any}>): void => {
    console.log("immediately", event.target.name, event.target.value);
    const abilName: string = event.target.name ? event.target.name : 'F';
    const abilVal = parseInt(event.target.value);
    console.log(`abilVal is ${abilVal}`);
    const abils: IAbilities = { ...abilities, [abilName]: abilVal ? abilVal : 8 };
    setAbilities(abils);
    setChoices(() => {
      return { ...choices, abilities: abils }
    });
    console.log('abilities', abilities);
  }

  const options = scores.map((s, i) => <option key={i} value={s} >{s}</option> );
  const abilitySelects = abilityNames.map(a => <AbilitySelect key={a} ability={a} handleAbilityChange={handleAbilityChange} children={options} />)

  return(
    <Paper>
      <Card>
        {abilitySelects}
        <Typography variant='body1' >
          {description}
        </Typography>
      </Card>
    </Paper>
  )
}

export default CreationAbilities;
