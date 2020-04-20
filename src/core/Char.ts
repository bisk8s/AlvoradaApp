import _ from 'lodash';
import { nameByRace } from 'fantasy-name-generator';

export interface AlvoradaChar {
  name: string;
  level: number;
  gender: AlvoradaGenderType;
  race: AlvoradaRaceType;
  charClass: AlvoradaClassType;
}

export type AlvoradaGenderType = 'male' | 'female' | 'transgender';
export const AlvoradaGenders: AlvoradaGenderType[] = [
  'male',
  'female',
  'transgender'
];

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

export const raceBaseHP = {
  'hp-Anão': 18,
  'hp-Bastet': 12,
  'hp-Caliban': 14,
  'hp-Draconiano': 20,
  'hp-Elfo': 14,
  'hp-Goblin': 10,
  'hp-Humano': 12,
  'hp-Ogro': 18,
  'hp-Trow': 14,
  'hp-Urso': 18
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
  const gender = _.sample([
    'male',
    'female',
    'transgender'
  ]) as AlvoradaGenderType;
  const race = _.sample(AlvoradaRaces) as AlvoradaRaceType;
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

export interface AlvoradaClassData {
  hpBonus: number;
  damange: number | number[];
  skills: {
    passiveSkill: AlvoradaClassMoveData;
    skill1: AlvoradaClassMoveData;
    skill2: AlvoradaClassMoveData;
    skill3: AlvoradaClassMoveData;
    skill4: AlvoradaClassMoveData;
    skill5: AlvoradaClassMoveData;
    ultimateSkill: AlvoradaClassMoveData;
  };
}
export interface AlvoradaClassMoveData {
  title: string;
  desc: string;
}
interface AlvoradaClassInfoListType {
  'class-Arqueiro': AlvoradaClassData;
  'class-Assasino': AlvoradaClassData;
  'class-Bárbaro': AlvoradaClassData;
  'class-Bardo': AlvoradaClassData;
  'class-Bispo': AlvoradaClassData;
  'class-Cigano': AlvoradaClassData;
  'class-Clérigo': AlvoradaClassData;
  'class-Demolidor': AlvoradaClassData;
  'class-Dragão': AlvoradaClassData;
  'class-Druida': AlvoradaClassData;
  'class-Ferreiro': AlvoradaClassData;
  'class-Guerreiro': AlvoradaClassData;
  'class-Ladino': AlvoradaClassData;
  'class-Monge': AlvoradaClassData;
  'class-Necromante': AlvoradaClassData;
  'class-Paladino': AlvoradaClassData;
  'class-Piromante': AlvoradaClassData;
  'class-Samurai': AlvoradaClassData;
  'class-Xamã': AlvoradaClassData;
}

export const AlvoradaClassInfoList: AlvoradaClassInfoListType = {
  'class-Arqueiro': {
    hpBonus: 2,
    damange: 10,
    skills: {
      passiveSkill: {
        title: 'Aqui Tem Coragem!',
        desc:
          'Caso o arqueiro venha estar em ambientes de caçadas e florestas, o PJ pode ter uma percepção apurada para detectar coisas que estejam fora do comum. Podendo perceber armadilhas e emboscadas através de um teste bem sucedido.'
      },
      skill1: {
        title: 'Flecha Perfurante',
        desc:
          'O arqueiro atira uma flecha que pode perfurar um inimigo ou superfície atingindo até 2 alvos. O dano no primeiro alvo atingido será o D10 normal do arqueiro, no segundo alvo o dano será reduzido à metade, caso caia um número quebrado será arredondado para o próximo número inteiro.'
      },
      skill2: {
        title: 'Caçador Famoso',
        desc:
          'Arqueiros também têm um bom conhecimento de natureza podendo ser bons caçadores. Em momentos delicados ou sem comida, através de um teste bem sucedido eles podem encontrar carnes e mantimentos para alimentar a si e seu grupo.'
      },
      skill3: {
        title: 'Tudo eu nessa vida',
        desc:
          'As aljavas em Alvorada podem carregar 10 flechas. O Arqueiro tem um modo de repor isto tranquilamente em seu descanso. Ele pode produzir um número de flechas igual à rolagem de um D10 e aproveitar um belo descanso.'
      },
      skill4: { title: '--', desc: '--' },
      skill5: { title: '--', desc: '--' },
      ultimateSkill: { title: '--', desc: '--' }
    }
  },
  'class-Assasino': {
    hpBonus: 2,
    damange: 4,
    skills: {
      passiveSkill: {
        title: 'Passo Leves',
        desc:
          ' O assassino recebe um bônus de +2 para qualquer teste de furtividade ou acrobacias.'
      },
      skill1: {
        title: 'Disfarce Ninja',
        desc:
          'O assassino foi treinado na arte do disfarce mudar a forma como as pessoas o percebem. Apenas a forma do assassino muda. Ele continua com os mesmos atributos, e tamanho, a ilusão apenas faz com que seja visto de outra forma.'
      },
      skill2: {
        title: 'Falsificação',
        desc:
          'Assassinos podem utilizar seus chi para falsificar objetos e documentos. Se o assassino se afastar demais do objeto ele retorna a sua forma normal.'
      },
      skill3: {
        title: 'Aracnídeo',
        desc:
          'com um teste bem sucedido o assassino pode usar seu chi para andar nas paredes ou teto dos ambientes.'
      },
      skill4: { title: '--', desc: '--' },
      skill5: { title: '--', desc: '--' },
      ultimateSkill: {
        title: 'Nocaute',
        desc:
          '(1 vez por Nv, recarrega com descanso) Durante um ataque furtivo, o assassino pode desmaiar o adversário. O alvo fica desacordado por 1D6 turnos, em caso de crítico o alvo pode receber dano.'
      }
    }
  },
  'class-Bárbaro': {
    hpBonus: 4,
    damange: 10,
    skills: {
      passiveSkill: {
        title: 'Duro como Aço',
        desc:
          'Bárbaros não usam armaduras, porém recebem apenas ¾ de qualquer dano físico causado a ele, reduzindo ao mínimo de 1 ponto de dano.'
      },
      skill1: {
        title: 'Golpe Furioso',
        desc:
          ' O Bárbaro desfere um golpe que causa o dobro de dano, porém seu alvo recebe um ataque de oportunidade. (Se sobreviver...)'
      },
      skill2: {
        title: 'Grito de Guerra',
        desc:
          'O bárbaro solta um grito poderoso, chamando a atenção de todos os inimigos. Todos aliados os próximos a inimigos ganham um ataque de oportunidade.'
      },
      skill3: {
        title: 'Bate Estaca',
        desc:
          'O bárbaro dá um pisão poderoso atordoando todos os inimigos a 1D4 metros próximos.'
      },
      skill4: {
        title: 'Golpe Giratorio',
        desc:
          'o bárbaro desfere um golpe giratorio dando 1D10 de dano distribuido entre os inimigos. Em caso de crítico o dano é total para cada atingido.'
      },
      skill5: {
        title: 'Ignorar a dor',
        desc:
          'O bárbaro ignora todo o dano causado por status negativos durante o combate, porém recebe o prejuízo total, de uma só vez ao fim do combate.'
      },
      ultimateSkill: {
        title: 'Fúria Berserker',
        desc:
          '(1 vez por Nv, recarrega com descanso) O bárbaro dobra os seus PVs por D6 turnos. Durante esse período não pode usar nenhuma outra habilidade ativa.'
      }
    }
  },
  'class-Bardo': {
    hpBonus: 2,
    damange: 6,
    skills: {
      passiveSkill: {
        title: 'Look What You Make Me Do',
        desc:
          'Bardos podem se comunicar com animais, tanto selvagens quanto domésticos, como se eles falassem sua língua.'
      },
      skill1: {
        title: 'Toxic',
        desc:
          'O bardo canaliza sua energia de megera através de uma canção mágica, podendo envenenar os inimigos ao seu redor com um teste bem sucedido de suas artes musicais. Cada sucesso envenena um adversário durante 1D4 turnos, e um crítico envenena dois deles.'
      },
      skill2: {
        title: 'Symphony Of Destruction',
        desc:
          'Como forma de encorajar seus aliados em embates, o bardo pode tocar canções que encorajem seus aliados em uma batalha. A melodia fornece +1 no teste de acerto de seus aliados, durante 1D4 turnos.'
      },
      skill3: {
        title: 'Ghost Town',
        desc:
          'Em situações delicadas, bardos podem criar uma ilusão de seu grupo por 1D4 turnos. Essa ilusão distrair os adversários podendo abrir possibilidade para fugir de um embate ou ameaça.'
      },
      skill4: {
        title: 'Just Dance',
        desc:
          'Bardos podem encantar platéias e adversários, forçando-os a dançar caso o teste seja bem sucedido. No sucesso 2 adversários ficam dançando, e em caso crítico todo o grupo de inimigos estará a dançar. Estar dançando impede qualquer ação durante 1D4 turnos.'
      },
      skill5: {
        title: 'Requiem Machi',
        desc:
          'Quando apenas o bardo estiver de pé em uma batalha, ele pode tocar uma canção que levanta todo restante do grupo, mas isso o deixará exausto, precisando de um descanso.'
      },
      ultimateSkill: { title: '--', desc: '--' }
    }
  },
  'class-Bispo': {
    hpBonus: 2,
    damange: 10,
    skills: {
      passiveSkill: {
        title: 'Afinidade',
        desc:
          'Todo e qualquer conteúdo de poder é da familiaridade da classe. Leitura de pergaminhos, enigmas, reconhecimento de poderes e afins têm um bônus de +1 no teste para serem desvendados e interpretados.'
      },
      skill1: {
        title: 'Esfera Elemental',
        desc:
          'O bispo conjura uma esfera de um elemento a sua escolha que causa D10 de dano ao adversário caso haja rolagem bem sucedida.'
      },
      skill2: {
        title: 'Raio Paralisante',
        desc:
          'O bispo levanta sua mão em direção ao inimigo desferindo um raio de energia que tem a chance de atordoamento de um inimigo durante D4 turnos caso haja rolagem bem sucedida.'
      },
      skill3: {
        title: 'Nevasca',
        desc:
          'O bispo poderá fazer com que haja uma nevasca num pequeno espaço causando D10 de dano. Pode congelar um inimigo durante D4 turnos caso haja acerto crítico.'
      },
      skill4: {
        title: 'Solo Ardente',
        desc:
          'Concentrando seu poder para uma que haja uma implosão do solo, o bispo atinge uma área ou adversário, causando D10 de dano. Pode causar queimaduras caso haja rolagem crítica.'
      },
      skill5: { title: '--', desc: '--' },
      ultimateSkill: { title: '--', desc: '--' }
    }
  },
  'class-Cigano': {
    hpBonus: 2,
    damange: 6,
    skills: {
      passiveSkill: {
        title: 'Cartografia',
        desc:
          'Com um excelente senso de direção. Os ciganos geralmente têm uma orientação em viagem se perdendo raramente. Tendo +2 no teste que envolva achar caminhos.'
      },
      skill1: {
        title: 'O Tolo',
        desc:
          'Quem tenta passar a perna em um cigano provavelmente irá passar por maus bocados. Pelos anos de estrada este aventureiro está vacinado contra chantagens e negociações corruptas. Ciganos podem fazer um teste para saber se estão falando a verdade e têm +2 em seu resultado.'
      },
      skill2: {
        title: 'Imperatriz',
        desc:
          'Utilizando de seu baralho o cigano pode tentar a sorte para que consiga paralisar um alvo de sua escolha por D4 turnos caso haja uma rolagem bem sucedida.'
      },
      skill3: {
        title: 'Roda da Fortuna',
        desc:
          'A fortuna por vezes sorri aos ciganos, que podem descobrir artefatos e segredos enquanto exploram. O aventureiro pode fazer um teste para achar estes segredos e tem +2 nos resultados.'
      },
      skill4: {
        title: 'Morte',
        desc:
          'O cigano pode tentar uma jogada de sorte em seu baralho. Ao puxar sua carta ele pode matar instantaneamente um adversário, porém deve ser um resultado crítico para o sucesso. Caso contrário, um de seus aliados será instantaneamente desmaiado.'
      },
      skill5: { title: '--', desc: '--' },
      ultimateSkill: { title: '--', desc: '--' }
    }
  },
  'class-Clérigo': {
    hpBonus: 2,
    damange: 6,
    skills: {
      passiveSkill: {
        title: 'Fervor Sagrado',
        desc:
          'Clérigos têm um bônus de +1 em testes para efetuar curas em si ou em seus aliados.'
      },
      skill1: {
        title: 'Toque Celestial',
        desc:
          'O clérigo levanta sua mão para um aliado curando 4+D10 PV. Ele pode fazer isso até 5 vezes antes de precisar descansar.'
      },
      skill2: {
        title: 'Purificar',
        desc:
          'O clérigo pode curar um status negativo de seu aliado. Ele pode fazer isso até 5 vezes antes de precisar descansar.'
      },
      skill3: {
        title: 'Chuva Sagrada',
        desc:
          'Com uma ação, o clérigo derrama poder sagrado sobre sua equipe curando D6 PV em todos. Ele pode fazer isso até 5 vezes antes de precisar descansar.'
      },
      skill4: {
        title: 'Estandarte Sagrado',
        desc:
          'O Clérigo lança um projétil do elemento sagrado, atingindo um alvo específico caso o teste seja bem sucedido.'
      },
      skill5: {
        title: 'Abraço do Eterno',
        desc:
          'A fé do clérigo abençoa um aliado, criando um escudo caso o teste seja bem sucedido. O escudo concede 2+D10 PV extra até acabar o combate, e só pode ser ativado em dois PJs ao mesmo tempo.'
      },
      ultimateSkill: {
        title: 'Fênix',
        desc:
          'Uma grande concentração de poder sagrado é canalizado pelo clérigo, reanimando um aliado desmaiado ou morto com metade dos PV. Esta habilidade só pode ser usada uma vez, para cada Nv., a cada descanso.'
      }
    }
  },
  'class-Demolidor': {
    hpBonus: 2,
    damange: 4,
    skills: {
      passiveSkill: {
        title: 'Gambiarra',
        desc:
          'O demolidor não passa aperto. Caso não tenha os materiais para criar suas bombas, o demolidor pode fazer um teste para fazer uma gambiarra e criar as bombas mesmo assim. Caso o teste seja crítico as bombas não sofrem nenhuma penalidade, caso contrário, elas são criadas com uma qualidade duvidosa.'
      },
      skill1: {
        title: 'Criar Armadilha Granada',
        desc: 'Bomba uma bomba poderosa que causa 1D10 de dano em área.'
      },
      skill2: {
        title: 'Criar Armadilha Explosiva',
        desc: 'Armadilha uma bomba poderosa que causa 1D12 de dano em área.'
      },
      skill3: {
        title: 'Criar Armadilha Grudenta',
        desc:
          'Uma bomba que paralisa os alvos por 1D4 turnos caso teste seja um sucesso.'
      },
      skill4: {
        title: 'Criar Buscapé',
        desc:
          'Um foguete que pode ser lançado contra um alvo distante. Causa 1D6 de dano no alvo em caso de acerto.'
      },
      skill5: {
        title: 'Desarmar',
        desc:
          'Devido ao seu conhecimento em armadilhas e bombas, o demolidor pode desarmar bombas que encontrar com um teste simples.'
      },
      ultimateSkill: {
        title: 'Criar Firecrackers',
        desc:
          'Firecrackers são bombinhas que podem ser lançadas como um ataque em área. Deve ser feito um teste para cada alvo, caso bem sucedido os alvos recebem 1d6 de dano cada.'
      }
    }
  },
  'class-Dragão': {
    hpBonus: 4,
    damange: 10,
    skills: {
      passiveSkill: {
        title: 'O que é fogo?',
        desc:
          'Dragões têm ainda mais resistência que demais guerreiros de sua raça. São praticamente imunes podendo até mesmo absorver parte deste poder concedendo bônus de ataque. O bônus de acerto pode ser acumulado mas tem o limite de +3.'
      },
      skill1: {
        title: 'Pulo',
        desc:
          'Por lutarem com lanças dragões tem um movimento como o de justa aprimorado em seu kit de habilidades. Podendo voar durante um momento de preparação e depois efetuar um ataque poderoso em um alvo. Esta habilidade dura dois turnos e necessita de duas rolagens, a primeira determinará se o voo foi bem executado, caso seja maior que 10 o draconiano alça vôo. No turno seguinte efetuará uma rolagem de acerto, ou seja D20, caso acerte o dano será de dois D10.'
      },
      skill2: {
        title: 'Destruição Draconiana',
        desc:
          'O interior do dragão é fogo puro e ele pode usar isto a seu favor. Posicionados em um movimento destrutivo podem soltar uma labareda em linha reta causando D10, caso tenha um resultado crítico causa queimaduras no alvo.'
      },
      skill3: {
        title: 'Investida Real',
        desc:
          'O dragão toma impulso dando uma poderosa investida com sua lança sendo um ataque devastador em sua frente causando D10 em um alvo.'
      },
      skill4: { title: '--', desc: '--' },
      skill5: { title: '--', desc: '--' },
      ultimateSkill: { title: '--', desc: '--' }
    }
  },
  'class-Druida': {
    hpBonus: 2,
    damange: 6,
    skills: {
      passiveSkill: {
        title: 'Vozes da floresta',
        desc: 'Druidas podem se comunicar com animais e plantas.'
      },
      skill1: {
        title: 'Espinhos Ferozes',
        desc:
          'Com um teste bem sucedido, o druida lança 1d12 espinhos contra o alvo. Cada espinho causa 1 de dano.'
      },
      skill2: {
        title: 'Fogo das Fadas',
        desc:
          'O druida lança uma bola de fogo frio que causa dano. 5 cargas diárias.'
      },
      skill3: {
        title: 'Toque de Cura',
        desc: 'Toque que cura cura 1d6. 5 cargas diárias.'
      },
      skill4: { title: '--', desc: '--' },
      skill5: { title: '--', desc: '--' },
      ultimateSkill: {
        title: 'Forma Selvagem',
        desc:
          'O druida pode se pode usar sua ação para assumir magicamente a forma de uma animais que já viu antes. O druida pode usar esse recurso duas vezes. O druida recupera os usos gastos ao terminar um descanso curto ou longo.'
      }
    }
  },
  'class-Ferreiro': {
    hpBonus: 4,
    damange: 10,
    skills: {
      passiveSkill: {
        title: 'Quanto custa o outfit?',
        desc:
          'Equipamentos para ferreiros são mais baratos em lojas de anões, além disso o mesmo pode vender equipamento criado por ele por um preço melhor.'
      },
      skill1: {
        title: 'Ta pegando fogo bicho!',
        desc:
          'Anos e anos de forja permitiram com que que a pele do ferreiro seja mais resistente a danos de ataques físicos e de fogo que o atinjam. Reduzem 1 de dano recebido.'
      },
      skill2: {
        title: 'Tremor da fornalha',
        desc:
          'Anos de forja também deram uma forja admirável ao ferreiro que pode auxiliá-lo, o aventureiro pode golpear o chão causando atordoamento em seus adversários por D4 turnos caso a rolagem de acerto seja bem sucedida.'
      },
      skill3: {
        title: 'Disciplina',
        desc:
          'Saber o momento certo de agir é parte do ofício de um ferreiro. O aventureiro pode aumentar seus instintos para aprimorar seus resultados durante um curto período. Ganha o bônus de +2 em seus acertos, só pode ser usado uma vez por semana.'
      },
      skill4: {
        title: 'Uma mãozinha aqui?',
        desc:
          'Ferreiro pode aprimorar equipamento de seus aliados, mas apenas um de cada vez demorando uma semana dentro da aventura. O ferreiro não estará trabalhando de graça, o seu companheiro deve lhe pagar uma quantia de ouro para que este trabalho seja efetuado.'
      },
      skill5: { title: '--', desc: '--' },
      ultimateSkill: { title: '--', desc: '--' }
    }
  },
  'class-Guerreiro': {
    hpBonus: 3,
    damange: 10,
    skills: {
      passiveSkill: { title: '--', desc: '--' },
      skill1: {
        title: 'Store',
        desc:
          'Esta habilidade dura dois turnos. Durante o primeiro, o aventureiro estará se concentrando, ficando imóvel e vulnerável, para no seguinte efetuar um ataque que causa dois D10 de dano.'
      },
      skill2: {
        title: 'Giro de Ataque',
        desc:
          'O guerreiro pega sua arma e gira criando uma zona de dano a inimigos. Com um crítico, causa um segundo ataque do mesmo tipo.'
      },
      skill3: {
        title: 'Grand Berserk',
        desc:
          'O guerreiro pode entrar em um estado no qual seus sentidos estão aprimorados, prontos para o uso de sua força, ganhando +2 em acerto. Porém isso sacrifica 10 pontos de vida e só pode ser usado uma vez por descanso.'
      },
      skill4: {
        title: 'Grito de Fúria',
        desc:
          'O guerreiro atrai a atenção de seus inimigos forçando-os atacá-lo. Se for bem sucedido no teste para provocá-los, o guerreiro também tem -1 de dano recebido.'
      },
      skill5: { title: '--', desc: '--' },
      ultimateSkill: { title: '--', desc: '--' }
    }
  },
  'class-Ladino': {
    hpBonus: 2,
    damange: 6,
    skills: {
      passiveSkill: {
        title: 'Gatuno',
        desc:
          'Ladinos podem ter a prioridade em combates, ganhando um bônus em iniciativa de +1.'
      },
      skill1: {
        title: 'Negro gato',
        desc:
          'Ladinos podem ficar em um modo furtivo ficando quase indetectáveis durante um período de D4 turnos caso seja bem sucedido no teste.'
      },
      skill2: {
        title: 'Dr. Nova',
        desc:
          'Venenos, armadilhas, emboscadas podem ser detectados pelo Ladino, com um teste bem sucedido ele pode encontrar e desarmar eventuais complicações.'
      },
      skill3: {
        title: 'TOC TOC',
        desc:
          'Ladinos pode efetuar ações furtivas como roubo, destrancar portas e cofres, desarmar armadilhas caso seja bem sucedido no teste.'
      },
      skill4: {
        title: 'Olhar Aprimorado',
        desc:
          'Ladinos tem faro para tesouros valiosos sabendo distinguir lugares onde estão escondendo itens valiosos através de um teste bem sucedido.'
      },
      skill5: {
        title: 'Segunda Imagem',
        desc:
          'Ladino para fugir de uma situação delicada pode criar uma pequena ilusão de si enganando o ambiente e pessoas sobre seu real posicionamento caso haja uma rolagem bem sucedida. A ilusão dura D4.'
      },
      ultimateSkill: { title: '--', desc: '--' }
    }
  },
  'class-Monge': {
    hpBonus: 3,
    damange: [6, 10],
    skills: {
      passiveSkill: {
        title: 'Temperança ',
        desc:
          'Todo início de dia o monge deve escolher sua estância: Defensivo (D) ou Ofensivo (O). Ele só poderá usar as habilidades da instância que escolheu até o dia seguinte.'
      },
      skill1: {
        title: '[D] Irmão Urso',
        desc:
          'O monge estende suas patas para um aliado, curando D10 PV. Ele pode fazer isso até 5 vezes antes de precisar descansar.'
      },
      skill2: {
        title: '[D] Dobradura ',
        desc:
          'O monge cria uma barreira de vento, reduzindo o dano causado a si ou um aliado pela metade por 1 turno caso a rolagem seja bem sucedida.'
      },
      skill3: {
        title: '[D] Kenai',
        desc:
          'As patas do monge podem recuperar um aventureiro de todos os status negativos. Ele pode fazer isso até 2 vezes antes de precisar descansar.'
      },
      skill4: {
        title: '[O] Rugido',
        desc:
          'O panda desfere um rugido contra um adversário, atordoando-o por D4 turnos. Caso role um crítico, pode amedrontar até 2 inimigos.'
      },
      skill5: {
        title: '[O] Coxim Sagrado',
        desc:
          'O panda devoto encanta suas patas com poder sagrado, podendo atordoar um alvo. Caso role crítico, causa dano.'
      },
      ultimateSkill: {
        title: '[O] Tri-Palma',
        desc:
          'O monge desfere 3 golpes em três turnos. No primeiro turno causa dano e imobiliza o adversário, no segundo também. O terceiro causa fraqueza durante D4 turnos. Errar um dos golpes interrompe a habilidade.'
      }
    }
  },
  'class-Necromante': {
    hpBonus: 2,
    damange: 6,
    skills: {
      passiveSkill: {
        title: 'Vozes do vazio',
        desc:
          'Necromantes conseguem localizar e se comunicar com cadáveres. Os cadáveres só podem responder sobre coisas que o falecido presenciou em vida.'
      },
      skill1: {
        title: 'Toque Profano',
        desc:
          'O necromante levanta sua mão para um alvo causando 4+D10 de dano. Ele pode fazer isso até 5 vezes antes de precisar descansar. Em caso de crítico causa estado de medo, fadiga, exaustão ou envenenamento no alvo. Ele pode fazer isso até 5 vezes antes de precisar descansar.'
      },
      skill2: {
        title: 'Spray Maldito',
        desc:
          'Com uma ação, o necromante lança um spray de poder profano em formato de cone causando D6 de dano profano nos atingidos, caso sejam mortos-vivos ao invés de dano causa cura. Ele pode fazer isso até 5 vezes antes de precisar descansar.'
      },
      skill3: {
        title: 'Estandarte Profano',
        desc:
          'O necromante lança um projétil do elemento profano, atingindo um alvo específico caso o teste seja bem sucedido.'
      },
      skill4: {
        title: 'Abraço do Profano',
        desc:
          'A fúria do necromante amaldiçoa um alvo, criando um miasma caso o teste seja bem sucedido. O miasma causa 1d4 de dano  por turno até acabar o combate, e só pode ser ativado em dois alvos ao mesmo tempo.'
      },
      skill5: {
        title: 'Conjurar Esqueleto',
        desc:
          'Invocando poder profano o necromante pode materializar um esqueleto (que surge do solo ou das sombras) e passa a segui-lo até a morte (de novo). Ele pode fazer isso até 5 vezes antes de precisar descansar. [ Esqueletos: PV: cinco D6 Dano: D6 Ações por turno: 1 ]'
      },
      ultimateSkill: {
        title: 'Fênix Negra',
        desc:
          '(1 vez por Nv, recarrega com descanso) Uma grande concentração de poder profano é canalizado pelo necromante, reanimando o alvo morto com metade dos PV. O reanimado passa a seguir as ordens do necromante. O reanimado perde 1d4 do total de vida por dia. Quando esse total chegar a zero não pode ser mais reanimado. Nos níveis 1 e 2 apenas criaturas comuns, nos níveis 2 e 3 mini-chefes, no nível 5 chefes e nível 6 épicos com teste crítico.'
      }
    }
  },
  'class-Paladino': {
    hpBonus: 4,
    damange: 6,
    skills: {
      passiveSkill: { title: '--', desc: '--' },
      skill1: {
        title: 'Protetor Sagrado',
        desc:
          'Caso um inimigo use um ataque que gerou desmaio em um aliado, o paladino é impelido por seu juramento de classe a proteger seu companheiro tomando o dano em seu lugar. Pelo ato de bravura o defensor recebe metade do dano que seria a seu aliado.'
      },
      skill2: {
        title: 'Luz Divina',
        desc:
          'O paladino levanta sua arma emanando uma luz que atordoa adversários por D4 turnos com um teste bem sucedido. A luz permanece até a habilidade ser desativada ou reutilizada, e pode iluminar caminhos extremamente escuros.'
      },
      skill3: {
        title: 'Mão Divina',
        desc:
          'O paladino coloca toda sua força em seus braços girando junto com sua arma acertando um grupo de inimigos caso haja uma rolagem bem sucedida.'
      },
      skill4: {
        title: 'Escudo do Eterno',
        desc:
          'Paladino se incube de seu juramento de proteger seus amigos ou grupo sendo o escudo deles. Durante este momento ele atrai o ataques que venham ao grupo e têm uma resistência diminuindo o dano recebido de 1.'
      },
      skill5: {
        title: 'Cura da Fé',
        desc:
          'Paladino estende suas mãos sobre um aliado, curando D4 PV. Ele pode fazer isso até 5 vezes antes de precisar descansar.'
      },
      ultimateSkill: { title: '--', desc: '--' }
    }
  },
  'class-Piromante': {
    hpBonus: 2,
    damange: 10,
    skills: {
      passiveSkill: {
        title: 'Caminho das brasas',
        desc: 'O piromante é imune a danos de fogo.'
      },
      skill1: {
        title: 'Bola de fogo ',
        desc:
          'O piromante conjura uma bola flamejante e a lança contra seu alvo. Em caso de acerto causa dano. Criticos causam queimadura no alvo.'
      },
      skill2: {
        title: 'Dança das chamas',
        desc:
          'O piromante dança com as chamas se movendo em velocidade incrível. Por onde ele pisa chamas emergem do chão causando dano naqueles que sejam tocadas por elas. Podem ser atingidos até 2D4 alvos. Críticos causam queimadura no alvo.'
      },
      skill3: {
        title: 'Lança chamas ',
        desc:
          'O piromante junta as duas mãos a frente do seu corpo lançando um grande cone de chamas na direção de suas palmas por até um D4 turnos. Em caso de crítico o dano é massivo, sendo duplicado (2D6). O piromante pode ser lançado para trás com o repuxo. Faça um teste de resistência, para não ser arrastado pela força das chamas. Críticos causam queimadura no alvo.'
      },
      skill4: {
        title: 'Parede Ígnea',
        desc:
          'O Piromante pode conjurar uma parede a de chamas à sua frente, ou na frente de um aliado. A parede de chamas têm uma pressão tão forte que não pode ser atravessada por projéteis simples.'
      },
      skill5: {
        title: 'Absorver chamas',
        desc:
          'Um piromante pode se concentrar e absorver as chamas próximas a ele. Recupera 1 PV por m² de área em chamas.'
      },
      ultimateSkill: {
        title: 'Coluna de fogo',
        desc:
          '(1 vez por Nv, recarrega com descanso) unindo as sua habilidades de Parede Ígnea e Dança das Chamas, o piromante se fecha dentro de uma grande coluna de fogo e corre para cima de seus inimigos causando dano de 2D6 pra cada alvo atingido. O piromante deve fazer um teste de resistência para não ficar atordoado após usar o golpe. Podem ser atingidos até 2D4 alvos. Críticos causam queimadura no alvo.'
      }
    }
  },
  'class-Samurai': {
    hpBonus: 3,
    damange: 10,
    skills: {
      passiveSkill: {
        title: 'O Último Samurai',
        desc:
          'Se o samurai recebe dano  massivo reduzindo seu PV a zero, ele recebe um turno extra com suas chances de acerto aprimoradas: suas rolagens tem um bônus de +2 antes de desmaiar.'
      },
      skill1: {
        title: 'Primeiro Ataque',
        desc:
          'Quando entra em combate, o samurai atenta seus instintos de batalha tendo a oportunidade de desferir o golpe inicial. Suas rolagens de iniciativa têm +2.'
      },
      skill2: {
        title: 'Controle de Energia',
        desc:
          'Por conta do treinamento intenso durante anos o samurai tem uma capacidade elevada de regeneração. Pós batalha o guerreiro pode entrar em um momento de regenerar, sem itens de cura ou templo, porém ele demora meio dia para se curar por completo.'
      },
      skill3: {
        title: 'Corte Sanguinário',
        desc:
          'O samurai saca rápido sua espada e executa um corte em “X” contra adversários, causando sangramento em caso de sucesso crítico. O dano do ataque é dobrado, porém o samurai só pode usar esse movimento 3 vezes antes de precisar de um descanso.'
      },
      skill4: {
        title: 'Última Instância',
        desc:
          'Em um movimento desesperado, o samurai sacrifica metade dos seus PV atuais para entrar em um estado de frenesi de batalha. Este momento é glorioso para o samurai porém de alto risco pois aumenta suas chances de acerto, com bônus de +5, porém sua resistência também cai, ônus de -5. Há uma demanda de energia muito grande do aventureiro para este movimento, necessitando descansar durante alguns dias.'
      },
      skill5: { title: '--', desc: '--' },
      ultimateSkill: { title: '--', desc: '--' }
    }
  },
  'class-Xamã': {
    hpBonus: 3,
    damange: 6,
    skills: {
      passiveSkill: {
        title: 'Sabedoria Ancestral',
        desc:
          'Xamãs podem fazer um teste para detectar se há alguma magia ou elemento mágico em objetos ou ambientes próximos.'
      },
      skill1: {
        title: 'Voodoo',
        desc:
          'Com um teste bem sucedido o xamã passa a controlar a criatura comum alvo por 1D4 turnos.'
      },
      skill2: {
        title: 'Criar: Ervas mastigadas',
        desc:
          'O xamã cria uma pasta de ervas que cura ao ser consumida. Do para xamãs de nível 1 e 2 as ervas curam 6PV, para xamãs de nível 3 e 4 as ervas curam 12PV, para xamãs de nível 5 e 6 curam todos os PVs.'
      },
      skill3: {
        title: 'Lodo Fumegante',
        desc:
          'O xamã lança um projétil de lodo, atingindo um alvo específico caso o teste seja bem sucedido. Em caso de crítico, pode causar envenenamento.'
      },
      skill4: {
        title: 'Transe de Fantasma',
        desc:
          'Em um transe poderoso o xamã pode sair do seu corpo e se mover livremente pelo ambiente durante até 2+1D4 turnos. Enquanto está em transe seu corpo fica completamente vulnerável. Cuidado.'
      },
      skill5: {
        title: 'Mãos sombrias',
        desc:
          'Mãos fantasmagóricas surgem do chão e paralisa o alvo por 1D4 turnos.'
      },
      ultimateSkill: {
        title: 'Espíritos ancestrais',
        desc:
          '(1 vez por Nv, recarrega com descanso) O xamã pode invocar um espírito guerreiro que lhe ajudará até o final do combate. Os espíritos não podem ser alvos de dano físico. [Espirito Guerreiro: PV: 3 D6 Dano: D4 Ações por turno: 1]'
      }
    }
  }
};
