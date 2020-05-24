import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AbilitySelect from './AbilitySelect';
import AbilityList from './AbilityList';
import { createAbilities, IAbilities, CharacterModel, AbilityBonusModel } from './util/character';

const abilitiesDescription = `Your character's ability scores measure how readily
  they're able to meet challenges of different types. Each class relies on
  different abilities to perform the various actions identifying each, e.g.
  fighters need high strength to hit and do extra damage, while wizards need
  high intelligence to have more and more effective spells.`
export const abilityNames = ['STR','DEX','CON','INT','WIS','CHA'];

interface CreationAbilitiesProps {
  choices: CharacterModel,
  setChoices: React.Dispatch<React.SetStateAction<CharacterModel>>
}

/**
 * Panel for selecting abilities and bonuses
 */
function CreationAbilities({choices, setChoices}: CreationAbilitiesProps) {
  const [ description ] = useState<string>(abilitiesDescription);
  const [ abilities, setAbilities ] = useState<IAbilities>(() => {
    if (choices.abilities) {
      return choices.abilities;
    } else {
      return createAbilities();
    }
  });
  const [ scoreChoices ] = useState<Array<number>>([15,14,13,12,10,8]);
  const [ bonuses, /* setBonuses */ ] = useState<Array<AbilityBonusModel>>(() => {
    if (choices.race) {
      return choices.race.abilityBonuses;
    } else {
      return [];
    }
  });
  const handleAbilityChange = (event: React.ChangeEvent<{name: string | undefined, value: any}>): void => {
    const abilName: string = event.target.name ? event.target.name : 'F';
    const abilVal = parseInt(event.target.value);
    const abils: IAbilities = { ...abilities, [abilName]: abilVal ? abilVal : 8 };
    setAbilities(abils);
    setChoices(() => {
      return { ...choices, abilities: abils }
    });
  }

  const options = scoreChoices.map((s, i) => <option key={i} value={s} >{s}</option> );
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
        <AbilityList scores={ abilities } bonuses={ bonuses } />
        <Typography variant='body1' >
          {description}
        </Typography>
      </Grid>
    </Paper>
  )
}

export default CreationAbilities;
