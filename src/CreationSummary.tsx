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
import gql from 'graphql-tag';
import { CharacterModel } from './util/character';

CreationSummary.fragments = {
  characterInfo: gql`
    fragment characterInfo on Character {
      name
      race {
        name
        description
      }
      abilities
      class {
        name
        description
      }
    }
  `
}

const SAVE_CHARACTER = gql`
  mutation CreateCharacter($record: CreateOneCharacterInput!) {
    characterAdd(record: $record) {
      record {
        ...characterInfo
      }
    }
  }
  ${CreationSummary.fragments.characterInfo}
`

function CreationSummary({choices, setChoices}: any) {
  const [name,setName] = useState<string>('');
  const [saveCharacter] = useMutation(SAVE_CHARACTER);
  const handleChange = (e: React.ChangeEvent<{value: any}>) => {
    setName(e.target.value);
    setChoices({...choices, name: e.target.value});
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
            const safeChar: CharacterModel = {
              name: choices.name,
              race: choices.race._id,
              class: choices.class._id,
              abilities: { ...choices.abilities },
              alignment: { ...choices.alignment },
              proficiencies: { ...choices.proficiencies },
            }
            saveCharacter({ variables: {record: safeChar}});
          }
        } >
          Save
        </Button>
      </Card>
    </Paper>
  )
}

export default CreationSummary;
