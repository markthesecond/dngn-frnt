import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { abilityNames } from './CreationAbilities';
import { applyBonuses, IAbilities, AbilityBonusModel } from './util/character';

export interface AbilityListProps {
  scores: IAbilities,
  bonuses: AbilityBonusModel[]
}

/**
 * A list of a characters ability scores, with additional controls as needed
 */
function AbilityList({scores, bonuses}: AbilityListProps): React.FunctionComponentElement<AbilityListProps> {
  const adjustedScores: IAbilities = applyBonuses(scores, bonuses);
  const abilityRows = abilityNames.map(n => {
    return (
      <TableRow key={ n } >
        <TableCell>{ n }</TableCell>
        <TableCell align='right' >{ adjustedScores[n] }</TableCell>
      </TableRow>
    )
  });

  return (
    <Grid item xs={6} sm={4} md={2}>
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ability</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {abilityRows}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Grid>
  )
}

export default AbilityList;
