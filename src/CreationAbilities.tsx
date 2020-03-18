import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AbilitySelect from './AbilitySelect';
import { CharacterModel } from './util/character';

interface Abilities {
  STR?: number | null,
  DEX?: number,
  CON?: number,
  INT?: number,
  WIS?: number,
  CHA?: number
}

/**
 * Panel for selecting abilities and bonuses
 */
function CreationAbilities({choices, setChoices}: any) {
  const abilitiesDescription = `Your character's ability scores measure how readily
    they're able to meet challenges of different types. Each class relies on
    different abilities to perform the various actions identifying each, e.g.
    fighters need high strength to hit and do extra damage, while wizards need
    high intelligence to have more and more effective spells.`
  const [description] = useState<string>(abilitiesDescription);
  const [ /* abilities */, setAbilities ] = useState<Abilities>({})
  const [scores] = useState<Array<number>>([15,14,13,12,10,8])
  const abilityNames = ['STR','DEX','CON','INT','WIS','CHA'];
  const handleAbilityChange = (event: React.ChangeEvent<{name: string | undefined, value: any}>): void => {
    const abilName: string = event.target.name ? event.target.name : 'F';
    setAbilities(abilities => {
      const abils = {...abilities, [abilName]: event.target.value};
      setChoices((choices: CharacterModel) => {return {...choices, abilities: abils}})
      return abils
    });
  }

  const options = scores.map((s, i) => <option key={i} value={s} >{s}</option> );
  const abilitySelects = abilityNames.map(a => {
    return <AbilitySelect
      key={a}
      ability={a}
      handleAbilityChange={handleAbilityChange}
      children={options} />
  });

  return(
    <Paper>
      <Grid container >
        {abilitySelects}
        <Typography variant='body1' >
          {description}
        </Typography>
      </Grid>
    </Paper>
  )
}

export default CreationAbilities;
