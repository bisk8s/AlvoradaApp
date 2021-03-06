import Constants from 'expo-constants';
import React, { Component } from 'react';
import _ from 'lodash';

import { ScrollView, View, TouchableOpacity } from 'react-native';
import {
  Appbar,
  Checkbox,
  IconButton,
  Menu,
  Surface,
  TextInput,
  Title,
  List,
  Paragraph,
  Switch
} from 'react-native-paper';

import Styles from './Styles';

import {
  AlvoradaChar,
  AlvoradaClassType,
  AlvoradaGenders,
  AlvoradaGenderType,
  AlvoradaRaces,
  AlvoradaRaceType,
  getAllowedClasses,
  randomCharName,
  AlvoradaClassInfoList,
  AlvoradaClassData,
  raceBaseHP,
  abilitiesList,
  raceMaxHabilities
} from '../../core/Char';

interface State {
  char: AlvoradaChar;
  id: number;

  classMenuVisible: boolean;
  raceMenuVisible: boolean;
  levelMenuVisible: boolean;
  genderMenuVisible: boolean;

  charClassList: AlvoradaClassType[];
  saveChar?: (char: AlvoradaChar, id: number) => void;
}

interface Props {
  navigation: any;
}

export default class CharViewScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
    const params = _.get(props.navigation.state, 'params', null);
    this.state = {
      ...params,

      classMenuVisible: false,
      raceMenuVisible: false,
      levelMenuVisible: false,
      genderMenuVisible: false,

      charClassList: getAllowedClasses(params.char.race)
    };
  }

  render() {
    return (
      <Surface style={Styles.container}>
        <Appbar.Header style={Styles.appbar}>
          <Appbar.Content
            title={Constants.manifest.name}
            subtitle={Constants.manifest.version}
          />
          <Appbar.Action
            icon="content-save"
            onPress={() => {
              this._saveChanges(this.state.char);
              this.props.navigation.goBack();
            }}
          />
        </Appbar.Header>

        <ScrollView style={Styles.hScrollView}>
          <View style={Styles.scrollContent}>
            <Title>Dados</Title>
            {/* Nome */}
            <View style={Styles.lineWrapper}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <TextInput
                  label="Nome"
                  mode="outlined"
                  value={this.state.char.name}
                  onChangeText={text => this._setCharName(text)}
                />
              </View>
              <View
                style={{ alignContent: 'center', justifyContent: 'center' }}
              >
                <IconButton icon="shuffle" onPress={this._setRandomCharName} />
              </View>
            </View>
            {/* Raça */}
            <View style={Styles.lineWrapper}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Menu
                  visible={this.state.raceMenuVisible}
                  onDismiss={this._closeAllMenus}
                  anchor={
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ raceMenuVisible: true });
                      }}
                    >
                      <TextInput
                        label="Raça"
                        mode="outlined"
                        value={this.state.char.race}
                        editable={false}
                        onTouchEnd={() => {
                          this.setState({ raceMenuVisible: true });
                        }}
                      />
                    </TouchableOpacity>
                  }
                >
                  {_.map(AlvoradaRaces, value => {
                    return (
                      <Menu.Item
                        key={value}
                        title={value}
                        onPress={() => {
                          this._setCharRace(value);
                        }}
                      />
                    );
                  })}
                </Menu>
              </View>
              <View
                style={{ alignContent: 'center', justifyContent: 'center' }}
              >
                <IconButton icon="shuffle" onPress={this._setRandomCharRace} />
              </View>
            </View>
            {/* Classe */}
            <View style={Styles.lineWrapper}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Menu
                  visible={this.state.classMenuVisible}
                  onDismiss={this._closeAllMenus}
                  anchor={
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ classMenuVisible: true });
                      }}
                    >
                      <TextInput
                        label="Classe"
                        mode="outlined"
                        value={this.state.char.charClass}
                        editable={false}
                        onTouchEnd={() => {
                          this.setState({ classMenuVisible: true });
                        }}
                      />
                    </TouchableOpacity>
                  }
                >
                  {_.map(this.state.charClassList, value => {
                    return (
                      <Menu.Item
                        key={value}
                        title={value}
                        onPress={() => {
                          this._setCharClass(value);
                        }}
                      />
                    );
                  })}
                </Menu>
              </View>
              <View
                style={{ alignContent: 'center', justifyContent: 'center' }}
              >
                <IconButton icon="shuffle" onPress={this._setRandomCharClass} />
              </View>
            </View>
            {/* --- */}
            <View style={Styles.lineWrapper}>
              {/* GENDER */}
              <View style={{ flex: 1, marginRight: 8 }}>
                <Menu
                  visible={this.state.genderMenuVisible}
                  onDismiss={this._closeAllMenus}
                  anchor={
                    <TextInput
                      label="Gênero"
                      mode="outlined"
                      value=" "
                      editable={false}
                      onTouchEnd={() => {
                        this.setState({ genderMenuVisible: true });
                      }}
                      render={props => {
                        return (
                          <IconButton
                            icon={`gender-${this.state.char.gender.toString()}`}
                            onPress={() => {
                              this.setState({ genderMenuVisible: true });
                            }}
                          />
                        );
                      }}
                    />
                  }
                >
                  {_.map(AlvoradaGenders, gender => {
                    return (
                      <Menu.Item
                        key={gender.toString()}
                        onPress={() => {
                          this._setCharGender(gender);
                        }}
                        title={(() => {
                          switch (gender) {
                            case 'male':
                              return 'Masculino';
                            case 'female':
                              return 'Feminino';
                            default:
                              return 'Não Binário';
                          }
                        })()}
                        icon={`gender-${gender.toString()}`}
                      />
                    );
                  })}
                </Menu>
              </View>
              <View
                style={{ alignContent: 'center', justifyContent: 'center' }}
              >
                <IconButton
                  icon="shuffle"
                  onPress={this._setRandomCharGender}
                />
              </View>
              {/* LEVEL */}
              <View style={{ flex: 1, marginRight: 8 }}>
                <Menu
                  visible={this.state.levelMenuVisible}
                  onDismiss={this._closeAllMenus}
                  anchor={
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ levelMenuVisible: true });
                      }}
                    >
                      <TextInput
                        label="Level"
                        mode="outlined"
                        value={this.state.char.level.toString()}
                        editable={false}
                        onTouchEnd={() => {
                          this.setState({ levelMenuVisible: true });
                        }}
                      />
                    </TouchableOpacity>
                  }
                >
                  {_.times(6, iNum => {
                    const num = iNum + 1;
                    return (
                      <Menu.Item
                        key={num.toString()}
                        onPress={() => {
                          this._setCharLevel(num);
                        }}
                        title={num.toString()}
                      />
                    );
                  })}
                </Menu>
              </View>
              <View
                style={{ alignContent: 'center', justifyContent: 'center' }}
              >
                <IconButton icon="shuffle" onPress={this._setRandomCharLevel} />
              </View>
            </View>
            <Title>Dados de Combate</Title>
            {/* END */}
            {_.map(
              [
                _.get(
                  AlvoradaClassInfoList,
                  `class-${this.state.char.charClass}`
                )
              ],
              (classData: AlvoradaClassData) => {
                return (
                  <View style={Styles.lineWrapper} key="">
                    <View>
                      <Title>Max. PV</Title>
                      <Paragraph>
                        {_.get(raceBaseHP, `hp-${this.state.char.race}`) +
                          classData.hpBonus * this.state.char.level}
                      </Paragraph>
                    </View>
                    <View>
                      <Title>Dano Base</Title>
                      <Paragraph>
                        {(_.isArray(classData.damange)
                          ? classData.damange
                          : [classData.damange]
                        )
                          .map(value => `1D${value}`)
                          .join(' / ')}
                      </Paragraph>
                    </View>
                  </View>
                );
              }
            )}
            <List.Section>
              <Title>Habilidades de Classe</Title>
              {_.map(
                [
                  _.get(
                    AlvoradaClassInfoList,
                    `class-${this.state.char.charClass}`
                  )
                ],
                (classData: AlvoradaClassData) => {
                  return _.map(classData.skills, (skill, iSkill) => {
                    if (skill.desc !== '--') {
                      return (
                        <List.Accordion
                          key={iSkill.toString()}
                          title={skill.title}
                          left={props => (
                            <List.Icon {...props} icon="sword-cross" />
                          )}
                        >
                          <Paragraph>{skill.desc}</Paragraph>
                        </List.Accordion>
                      );
                    }
                  });
                }
              )}
            </List.Section>
            <List.Section>
              <Title>
                Perícias: ({this.state.char.abilities.length}/
                {_.get(raceMaxHabilities, `hb-${this.state.char.race}`, 0) +
                  this.state.char.level -
                  1}
                )
              </Title>
              {_.map(abilitiesList, (ability, iAbility) => {
                return (
                  <List.Accordion
                    key={iAbility.toString()}
                    title={ability.name}
                    left={props => (
                      <Checkbox
                        {...props}
                        status={
                          this.state.char.abilities.lastIndexOf(ability) < 0
                            ? 'unchecked'
                            : 'checked'
                        }
                      />
                    )}
                  >
                    <View
                      style={{
                        paddingRight: 16,
                        alignItems: 'flex-start'
                      }}
                    >
                      <View style={{ flexDirection: 'row' }}>
                        <Paragraph>Ativar: </Paragraph>
                        <Switch
                          onValueChange={() => {
                            const { char } = this.state;
                            if (char.abilities.lastIndexOf(ability) < 0) {
                              char.abilities.push(ability);
                            } else {
                              _.pull(char.abilities, ability);
                            }
                            this._saveChanges(char);
                          }}
                          value={
                            !(
                              this.state.char.abilities.lastIndexOf(ability) < 0
                            )
                          }
                        />
                      </View>
                      <Paragraph>{ability.desc}</Paragraph>
                    </View>
                  </List.Accordion>
                );
              })}
            </List.Section>
          </View>
        </ScrollView>
      </Surface>
    );
  }

  _saveChanges = (char: AlvoradaChar) => {
    this.setState({
      char: {
        ...this.state.char,
        ...char
      }
    });
    if (this.state.saveChar)
      this.state.saveChar(this.state.char, this.state.id);
  };

  _setRandomCharName = () => {
    const name = randomCharName(this.state.char.race, this.state.char.gender);
    this._setCharName(name);
  };
  _setCharName = name => {
    const char = {
      ...this.state.char,
      name
    };
    this._saveChanges(char);
  };

  _closeAllMenus = () => {
    this.setState({
      classMenuVisible: false,
      raceMenuVisible: false,
      levelMenuVisible: false,
      genderMenuVisible: false
    });
  };

  _setRandomCharLevel = () => {
    this._setCharLevel(_.sample(_.times(6, num => num + 1)));
  };
  _setCharLevel = (level: number) => {
    const char = {
      ...this.state.char,
      level
    };
    this._closeAllMenus();
    this._saveChanges(char);
  };

  _setRandomCharRace = () => {
    this._setCharRace(_.sample(AlvoradaRaces));
  };
  _setCharRace = (race: AlvoradaRaceType) => {
    let charClass = this.state.char.charClass;
    const charClassList = getAllowedClasses(race);
    if (_.lastIndexOf(charClassList, charClass) < 0) {
      charClass = _.first(charClassList);
    }
    this.setState({
      charClassList
    });
    const char = {
      ...this.state.char,
      race,
      charClass
    };
    this._closeAllMenus();
    this._saveChanges(char);
  };

  _setRandomCharClass = () => {
    this._setCharClass(_.sample(this.state.charClassList));
  };
  _setCharClass = (charClass: AlvoradaClassType) => {
    const char = {
      ...this.state.char,
      charClass
    };
    this._closeAllMenus();
    this._saveChanges(char);
  };

  _setRandomCharGender = () => {
    this._setCharGender(_.sample(AlvoradaGenders));
  };
  _setCharGender = (gender: AlvoradaGenderType) => {
    const char = {
      ...this.state.char,
      gender
    };
    this._closeAllMenus();
    this._saveChanges(char);
  };
}
