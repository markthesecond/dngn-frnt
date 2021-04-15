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

export interface IAbilities {
  [index: string]: number,
  STR: number,
  DEX: number,
  CON: number,
  INT: number,
  WIS: number,
  CHA: number,
}

/**
 * Function to create an Abilities object
 * @param str the value for the STR score, defaults to 8
 * @param dex the value for the DEX score, defaults to 8
 * @param con the value for the CON score, defaults to 8
 * @param int the value for the INT score, defaults to 8
 * @param wis the value for the WIS score, defaults to 8
 * @param cha the value for the CHA score, defaults to 8
 * @see IAbilities
 * @returns A new Abilities object based on supplied values
 */
export function createAbilities(
  str = 8, dex = 8, con = 8, int = 8, wis = 8, cha = 8
): IAbilities {
  return {
    STR: str,
    DEX: dex,
    CON: con,
    INT: int,
    WIS: wis,
    CHA: cha
  }
}

export function copyAbilities(abils: IAbilities): IAbilities {
  return {
    STR: abils['STR'],
    DEX: abils['DEX'],
    CON: abils['CON'],
    INT: abils['INT'],
    WIS: abils['WIS'],
    CHA: abils['CHA'],
  }
}

export function iAbilitiesToString(abils: IAbilities): string {
  return `[ STR: ${abils.STR}, DEX: ${abils.DEX}, CON: ${abils.CON}, INT: ${abils.INT}, WIS: ${abils.WIS}, CHA: ${abils.CHA}, ]`
}

export interface AbilityBonusModel {
  ability: Ability,
  amount: number
}

/**
 * A method to return adjusted ability scores
 * @param abilities the scores to adjust
 * @param bonuses the array of bonuses, like from a Race model
 * @returns the adjusted Abilities object
 */
export function applyBonuses(abilities: IAbilities, bonuses: AbilityBonusModel[]): IAbilities {
  bonuses.forEach(b => {
    abilities[b.ability] = abilities[b.ability] + b.amount
  });
  return abilities
}

/** */
export function assignBonus(bonus: AbilityBonusModel, ability: Ability): AbilityBonusModel {
  return { ability, amount: bonus.amount }
} 

export interface VisionModel {
  type: VisionType,
  distance: number
}

export interface RaceModel {
  _id?: string,
  name: string,
  size: CreatureSize,
  walkingSpeed?: number,
  vision: VisionModel[],
  languages: Array<string>,
  abilityBonuses: AbilityBonusModel[],
  skills: Array<string>,
  traits: Array<string>,
  description: string
}

export interface ClassModel {
  _id?: string,
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
  traits: Array<string>,
  description: string,
}

export interface Proficiencies {
  bonus: number,
  weapon?: Array<string>,
  tool?: Array<string>,
  skill?: Array<string>
}

export interface CharacterModel {
  _id?: string,
  name?: string,
  race?: RaceModel,
  class?: ClassModel,
  abilities?: IAbilities,
  alignment?: {
    orthodoxy: string,
    morality: string
  },
  spellbook?: Array<SpellModel>,
  proficiencies?: Proficiencies,
  feats?: Array<string>,
  religion?: string
}
