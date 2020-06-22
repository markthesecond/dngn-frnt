import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/react-hooks';
import { CharacterModel } from './util/character';
import { SAVE_CHARACTER } from './graphql/characterQueries';

function CreationSummary({choices, setChoices}: any) {
  const [name,setName] = useState<string>('');
  const [saveCharacter] = useMutation(SAVE_CHARACTER);
  const handleChange = (e: React.ChangeEvent<{value: any}>) => {
    setName(e.target.value);
    setChoices({...choices, name: e.target.value});
  }

  const makeCharacterFromChoices = (choices: any): CharacterModel => {
    const char: CharacterModel = {
      name: choices.name ? choices.name : null,
      race: choices.race ? choices.race._id : null,
      class: choices.class ? choices.class._id : null,
      abilities: choices.abilities ? { ...choices.abilities } : null,
      alignment: choices.alignment ? { ...choices.alignment } : null,
      proficiencies: choices.proficiencies ? { ...choices.proficiencies } : null,
    }

    return char
  }

  const abilityScores = choices.abilities ? choices.abilities : {};

  return(
    <Paper>
      <Card>
        <CardHeader title={name} />
        <CardContent>
          <TextField value={name} onChange={handleChange} placeholder='Enter a name' />
          <Typography variant='h6' >Race</Typography>
          <Typography variant='body1' >{choices.race ? choices.race.name : null}</Typography>
          <Typography variant='h6' >Class</Typography>
          <Typography variant='body1' >{choices.class ? choices.class.name : null}</Typography>
          <Typography variant='h6' >Abilities</Typography>
          <Table aria-label='ability-table' >
            <TableHead>
              <TableRow>
                <TableCell>STR</TableCell>
                <TableCell>DEX</TableCell>
                <TableCell>CON</TableCell>
                <TableCell>INT</TableCell>
                <TableCell>WIS</TableCell>
                <TableCell>CHA</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{abilityScores.STR ? abilityScores.STR : '-'}</TableCell>
                <TableCell>{abilityScores.DEX ? abilityScores.DEX : '-'}</TableCell>
                <TableCell>{abilityScores.CON ? abilityScores.CON : '-'}</TableCell>
                <TableCell>{abilityScores.INT ? abilityScores.INT : '-'}</TableCell>
                <TableCell>{abilityScores.WIS ? abilityScores.WIS : '-'}</TableCell>
                <TableCell>{abilityScores.CHA ? abilityScores.CHA : '-'}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <Button
          onClick={() => {
            const safeChar = makeCharacterFromChoices(choices);
            saveCharacter({ variables: { record: safeChar } });
          }
        } >
          Save
        </Button>
      </Card>
    </Paper>
  )
}

export default CreationSummary;
