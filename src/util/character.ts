import { StartItems } from './item';
import { SpellModel } from './spell';

export enum Ability {
  STR = 'STR',
  DEX = 'DEX',
  CON = 'CON',
  INT = 'INT',
  WIS = 'WIS',
  CHA = 'CHA',
  FRE = 'FRE'
}

export enum VisionType {
  Darkvision = 'Darkvision',
  Lowlight = 'Lowlight',
  Blindsight = 'Blindsight',
  Truesight = 'Truesight',
  Tremorsense = 'Tremorsense'
}

export enum DieType {
  d2 = 2,
  d4 = 4,
  d6 = 6,
  d8 = 8,
  d10 = 10,
  d12 = 12,
  d20 = 20
}

export enum CreatureSize {
  Tiny,
  Small,
  Medium,
  Large,
  Huge,
  Gargantuan
}

export interface AbilityBonusModel {
  ability: Ability,
  amount: number
}

export interface VisionModel {
  type: VisionType,
  distance: number
}

export interface RaceModel {
  name: string,
  size: CreatureSize,
  walkingSpeed: number,
  vision: VisionModel,
  languages: Array<string>,
  abilityBonuses: [AbilityBonusModel],
  skills: Array<string>,
  traits: Array<string>
}

export interface ClassModel {
  name: string,
  subclass?: boolean,
  hitDie: DieType,
  armor: Array<string>,
  weapon: Array<string>,
  tool: Array<string>,
  saves: Array<Ability>,
  skillSelection: Array<string>,
  numberOfSkills: number,
  startingEquipment: StartItems,
  traits: Array<string>
}

export interface Proficiencies {
  bonus: number,
  weapon?: Array<string>,
  tool?: Array<string>,
  skill?: Array<string>
}

export interface CharacterModel {
  name?: string,
  race?: RaceModel,
  abilities?: {
    str: number,
    dex: number,
    con: number,
    int: number,
    wis: number,
    cha: number
  },
  alignment?: {
    orthodoxy: string,
    morality: string
  },
  spellbook?: Array<SpellModel>,
  proficiencies?: Proficiencies,
  feats?: Array<string>,
  religion?: string
}

