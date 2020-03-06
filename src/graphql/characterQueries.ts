import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';

const fragments = {
  raceInfo: gql`
    fragment raceInfo on Race {
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
  `,
  classInfo: gql`
  
    fragment classInfo on Class {
      _id
      name
      subclass
      hitDie
      armor
      weapon
      tool
      saves
      skillSelection
      numberOfSkills
      startingEquipment
      spellcasting {
        able
        ability
      }
      traits
      description
    }
  `,
}

export const CREATION_RACES: DocumentNode = gql`
  query Races {
    races {
      ...raceInfo
    }
  }
  ${fragments.raceInfo}
`

export const CREATION_CLASSES: DocumentNode = gql`
  query Classes {
    classes {
      ...classInfo
    }
  }
  ${fragments.classInfo}
`
