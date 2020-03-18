import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import { useQuery } from '@apollo/react-hooks';
import { ClassModel } from './util/character';
import { CREATION_CLASSES } from './graphql/characterQueries';

/**
 * Panel to select a class for a character
 */
function CreationClass({choices, setChoices}: any) {
  const classDescription = `Your character's class describes how they interact 
    with their surroundings and make their living in the world. In game terms, 
    your class (or classes) control your health and how you overcome obstacles`
  const [description, setDescription] = useState<string>(classDescription);
  const { loading, error, data } = useQuery(CREATION_CLASSES);
  const [classes, setClasses] = useState<Array<ClassModel>>([]);
  useEffect(() => {
    if (data)
    setClasses(data.classes);
  }, [data]);

  if (loading) {
    return <>"Loading..."</>;
  } else if (error) {
    return <>"Error..." ${error.message}</>;
  }
  const options: Array<JSX.Element> = classes.map((r: ClassModel) =>
    <option key={r._id} value={r._id} >{r.name}</option>);
  

  

  const handleChange = (event: React.ChangeEvent<{value: any }>): void => {
    let newClass = classes.find(c => c._id === event.target.value) as ClassModel
    setChoices({...choices, class: newClass});
    setDescription(newClass.description ? newClass.description : classDescription);
  }

  return(
    <Paper>
      <Card>
        <Select
          name='class'
          labelId='Class'
          native
          autoWidth
          onChange={handleChange} >
          <option value='' data-description='' >Select a Class...</option>
          {options}
        </Select>
        <Typography variant='body1' >
          {description}
        </Typography>
      </Card>
    </Paper>
  )
}

export default CreationClass;
