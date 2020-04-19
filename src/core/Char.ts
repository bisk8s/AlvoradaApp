import _ from 'lodash';
import { nameByRace, RaceType } from 'fantasy-name-generator';
import { ClassType } from 'react';

export interface AlvoradaChar {
  name: string;
  level: number;
  gender: AlvoradaGender;
  race: AlvoradaRaceType;
  charClass: AlvoradaClassType;
}

export type AlvoradaGender = 'male' | 'female' | 'transgender';
export type AlvoradaRaceType =
  | 'Anão'
  | 'Bastet'
  | 'Caliban'
  | 'Draconiano'
  | 'Elfo'
  | 'Goblin'
  | 'Humano'
  | 'Ogro'
  | 'Trow'
  | 'Urso';
export const AlvoradaRaces: AlvoradaRaceType[] = [
  'Anão',
  'Bastet',
  'Caliban',
  'Draconiano',
  'Elfo',
  'Goblin',
  'Humano',
  'Ogro',
  'Trow',
  'Urso'
];

export type AlvoradaClassType =
  | 'Arqueiro'
  | 'Assasino'
  | 'Bárbaro'
  | 'Bardo'
  | 'Bispo'
  | 'Cigano'
  | 'Clérigo'
  | 'Demolidor'
  | 'Dragão'
  | 'Druida'
  | 'Ferreiro'
  | 'Guerreiro'
  | 'Ladino'
  | 'Monge'
  | 'Necromante'
  | 'Paladino'
  | 'Piromante'
  | 'Samurai'
  | 'Xamã';
export const AlvoradaClassList: AlvoradaClassType[] = [
  'Arqueiro',
  'Assasino',
  'Bárbaro',
  'Bardo',
  'Bispo',
  'Cigano',
  'Clérigo',
  'Demolidor',
  'Dragão',
  'Druida',
  'Ferreiro',
  'Guerreiro',
  'Ladino',
  'Monge',
  'Necromante',
  'Paladino',
  'Piromante',
  'Samurai',
  'Xamã'
];

const races = [
  'Anão',
  'Bastet',
  'Caliban',
  'Draconiano',
  'Elfo',
  'Goblin',
  'Humano',
  'Ogro',
  'Trow',
  'Urso'
];

const globalClasses: AlvoradaClassType[] = [
  'Arqueiro',
  'Bárbaro',
  'Bardo',
  'Bispo',
  'Cigano',
  'Druida',
  'Guerreiro',
  'Ladino',
  'Paladino'
];

const allowedClassByRace = {
  'cl-for-Anão': [...globalClasses, 'Ferreiro'],
  'cl-for-Bastet': [...globalClasses, 'Assasino'],
  'cl-for-Caliban': [...globalClasses, 'Piromante'],
  'cl-for-Draconiano': [...globalClasses, 'Dragão'],
  'cl-for-Elfo': [...globalClasses, 'Clérigo'],
  'cl-for-Goblin': [...globalClasses, 'Demolidor'],
  'cl-for-Humano': [...globalClasses, 'Samurai'],
  'cl-for-Ogro': [...globalClasses, 'Xamã'],
  'cl-for-Trow': [...globalClasses, 'Necromante'],
  'cl-for-Urso': [...globalClasses, 'Monge']
};

const racesConversionTable = {
  'en-for-Anão': 'dwarf',
  'en-for-Bastet': 'fairy',
  'en-for-Caliban': 'drow',
  'en-for-Draconiano': 'dragon',
  'en-for-Elfo': 'elf',
  'en-for-Goblin': 'goblin',
  'en-for-Humano': 'human',
  'en-for-Ogro': 'orc',
  'en-for-Trow': 'darkelf',
  'en-for-Urso': 'cavePerson'
};

export function randomNewChar(): AlvoradaChar {
  const gender = _.sample(['male', 'female', 'transgender']) as AlvoradaGender;
  const race = _.sample(races) as AlvoradaRaceType;
  const name = randomCharName(race, gender);
  const charClass = _.sample(getAllowedClasses(race));
  return {
    name,
    gender,
    level: 1,
    race,
    charClass
  };
}

export function randomCharName(race, gender) {
  const genRace = _.get(racesConversionTable, `en-for-${race}`);
  const genGender = gender === 'male' ? gender : 'female';
  return _.toString(
    nameByRace(genRace, {
      gender: genGender,
      allowMultipleNames: false
    })
  );
}

export function getAllowedClasses(race: AlvoradaRaceType): AlvoradaClassType[] {
  return _.get(allowedClassByRace, `cl-for-${race}`).sort();
}
