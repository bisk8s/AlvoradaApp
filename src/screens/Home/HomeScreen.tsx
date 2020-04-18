import Constants from 'expo-constants';
import React, { Component } from 'react';
import _ from 'lodash';

import { Appbar, Title, Button } from 'react-native-paper';

import Styles from './Styles';
import { ScrollView, View } from 'react-native';

import TouchableCard from '../../components/TouchableCard';

import LocalStorage from '../../services/LocalStorage';
import { AlvoradaChar, randomNewChar } from '../../core/Char';
import { CategoryIconType } from '../../icons/CategoryIcon';

interface State {
  charList?: AlvoradaChar[];
}

export default class HomeScreeen extends Component<any, State> {
  constructor(props) {
    super(props);
    this.state = { charList: [] };
  }

  componentDidMount() {
    this._loadChars();
  }

  _newChar = () => {
    const { charList } = this.state;
    charList.push(randomNewChar());
    this.setState({ charList });
  };
  _loadChars = () => {
    LocalStorage.get('charList').then(charList => {
      if (charList) {
        this.setState({ charList });
      }
    });
  };

  render() {
    return (
      <View style={Styles.container}>
        <Appbar.Header style={Styles.appbar}>
          {/* <Appbar.Action icon="menu" onPress={() => {}} /> */}
          <Appbar.Content
            title={Constants.manifest.name}
            subtitle={Constants.manifest.version}
          />
          <Appbar.Action icon="account-plus" onPress={this._newChar} />
        </Appbar.Header>
        <View style={Styles.titleWrapper}>
          <Title>Personagens</Title>
        </View>
        <ScrollView pagingEnabled style={Styles.hScrollView}>
          <View style={Styles.homeMenuItems}>
            {_.map(this.state.charList, (char, iChar) => {
              return (
                <TouchableCard
                  key={iChar.toString()}
                  title={char.name}
                  caption={[char.race, char.charClass].join('\n')}
                  chips={[
                    { text: 'Gen.', icon: `gender-${char.gender}` },
                    { text: 'Nvl.', icon: `numeric-${char.level}-circle` }
                  ]}
                  icon={char.charClass.toString() as CategoryIconType}
                  onPress={() => {
                    console.log(char.name);
                  }}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
