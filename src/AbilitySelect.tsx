import React from 'react';
// import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';


function AbilitySelect({handleAbilityChange, ability, children}: any) {
  const setDesc = () => {
    switch (ability) {
      case 'STR':
        return `Strength measures bodily power, athletic training, and the 
          extent to which you can exert raw physical force. You add your 
          Strength modifier to your Attack roll and your damage roll when 
          attacking with a melee weapon.`
      case 'DEX':
        return `Dexterity measures agility, reflexes, and balance. You add 
          your Dexterity modifier to your Attack roll and your damage roll 
          when attacking with a ranged weapon.`
      case 'CON':
        return `Constitution measures health, stamina, and vital force. Your 
          Constitution modifier contributes to your Hit Points. Typically, you 
          add your Constitution modifier to each Hit Die you roll for your 
          Hit Points.`
      case 'INT':
        return `Intelligence measures mental acuity, accuracy of recall, and 
          the ability to reason. Wizards use Intelligence as their Spellcasting 
          Ability, which helps determine the saving throw DCs of Spells they cast.`
      case 'WIS':
        return `Wisdom reflects how attuned you are to the world around you 
          and represents perceptiveness and intuition. Clerics, druids, and 
          rangers use Wisdom as their Spellcasting Ability, which helps 
          determine the saving throw DCs of Spells they cast.`
      case 'CHA':
        return `Charisma measures your ability to interact effectively with 
          others. It includes such factors as confidence and eloquence, and it 
          can represent a charming or commanding personality. Bards, paladins, 
          sorcerers, and warlocks use Charisma as their Spellcasting Ability, 
          which helps determine the saving throw DCs of Spells they cast.`
      default:
        return "That's not an ability."
    }
  }
  const abilDesc: string = setDesc();
  return (
    <Card>
      <CardHeader title={<Typography variant='h5' >{ability}</Typography>}/>
      <CardContent>
        <Typography variant='body2' >{abilDesc}</Typography>
      </CardContent>
      <CardActions>
        <Select
          name={ability}
          native
          autoWidth
          onChange={handleAbilityChange} >
          <option value={undefined} >Select a Score...</option>
          {children}
        </Select>
      </CardActions>
    </Card>
  )
}

export default AbilitySelect;
