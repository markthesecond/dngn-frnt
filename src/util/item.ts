import { DieType } from './character';

export interface Item {
  name: string,
  weight?: number,
  rarity?: string,
  material?: string,
  price?: number,
  description?: string,
  specialEffects?: Array<string>,
  type?: string
}

export interface StartItems {
  choice1: Array<Item> | Item,
  choice2: Array<Item> | Item,
  choice3: Array<Item> | Item,
}

export enum ArmorCategory {
  Light = 'LIGHT',
  Medium = 'MEDIUM',
  Heavy = 'HEAVY'
}

export interface ArmorModel {
  armorCat: ArmorCategory,
  armorClass: number,
  armorBonus?: number,
  stealthDisadvantage: boolean,
  dexModifiier: boolean | number
}

export interface Roll {
  amount: number,
  sides: DieType
}

export interface WeaponModel {
  weaponType: string,
  damageType: Array<string>,
  damageRoll: Roll,
  damageBonus: number,
  properties: Array<string>,
  rangeNormal?: number,
  rangeLong?: number,
  simple: boolean
}
