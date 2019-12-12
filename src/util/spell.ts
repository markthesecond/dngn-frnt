export enum TimeUnit {
  Instantaneous,
  Reaction,
  Bonus,
  Action,
  Round,
  Minute,
  Hour,
  Day
}

export interface Time {
  amount: number,
  unit: TimeUnit
}

export enum SpaceUnit {
  Square,
  Foot,
  Mile
}

export enum Shape {
  Ray,
  Cone,
  Sphere,
  Cube,
  Cylinder
}

export interface Area {
  amount: number,
  unit: SpaceUnit,
  shape?: Shape
}

export enum Target {
  Other = 'OTHER',
  Self = 'SELF'
}

export interface SpellModel {
  name: string,
  school: string,
  level: number,
  castingTime: Time,
  duration: Time,
  ritual: boolean,
  areaOfEffect: Area,
  target: Target,
  range: number,
  effects: Array<string>,
  effectsAtHigherLevels: Array<string>
}
