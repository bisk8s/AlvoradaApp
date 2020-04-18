import _ from 'lodash';
import { nameByRace } from 'fantasy-name-generator';

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

const globalClasses = [
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

export function randomNewChar(): AlvoradaChar {
  const gender = _.sample(['male', 'female', 'transgender']) as AlvoradaGender;
  const name = _.toString(
    nameByRace('human', { gender, allowMultipleNames: false })
  );
  const race = _.sample(races) as AlvoradaRaceType;
  const charClass = _.sample(_.get(allowedClassByRace, `cl-for-${race}`));
  return {
    name,
    gender,
    level: 1,
    race,
    charClass
  };
}
