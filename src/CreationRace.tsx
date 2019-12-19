import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { RaceModel } from './util/character';

CreationRace.fragments = {
  races: gql`
    fragment creationStats on Race {
      _id
      name
      vision {
        type
        distance
      }
      traits
      skills
      abilityBonuses {
        ability
        amount
      }
      languages
      size
      description
    }
  `
}
const CREATION_RACES = gql`
  query Races {
    races {
      ...creationStats
    }
  }
  ${CreationRace.fragments.races}
`

function CreationRace({choices, setChoices}: any) {
  const raceDescription = `Your character's race determines their overall appearance,
   and often gives a clue or two to their background. In terms of gameplay, 
   your race will affect how you are perceived by strangers and what your 
   predisposed strengths are.`
  const [description, setDescription] = useState<string>(raceDescription);
  const { loading, error, data } = useQuery(CREATION_RACES);
  const [races, setRaces] = useState<Array<RaceModel>>([]);
  useEffect(() => {
    if (data)
    setRaces(data.races);
  }, [data]);

  if (loading) {
    return <>"Loading..."</>;
  } else if (error) {
    return <>"Error..." ${error.message}</>;
  }
  const options: Array<JSX.Element> = races.map((r: RaceModel) =>
    <option key={r._id} value={r._id} >{r.name}</option>);
  

  

  const handleChange = (event: React.ChangeEvent<{value: any }>): void => {
    let newRace = races.find(r => r._id === event.target.value) as RaceModel
    setChoices({...choices, race: newRace});
    setDescription(newRace.description ? newRace.description : raceDescription);
  }

  return(
    <Paper>
      <Card>
        <Select
          name='race'
          labelId='Race'
          native
          autoWidth
          onChange={handleChange} >
          <option value='' data-description='' >Select a Race...</option>
          {options}
        </Select>
        <Typography variant='body1' >
          {description}
        </Typography>
      </Card>
    </Paper>
  )
}

export default CreationRace;
