import Constants from 'expo-constants';
import React, { Component } from 'react';
import _ from 'lodash';

import { ScrollView, View } from 'react-native';
import {
  Surface,
  Appbar,
  Title,
  IconButton,
  TextInput,
  Menu
} from 'react-native-paper';

import Styles from './Styles';

import LocalStorage from '../../services/LocalStorage';
import { AlvoradaChar } from '../../core/Char';

interface State {
  id: number;
  char: AlvoradaChar;

  classMenuVisible: boolean;
  raceMenuVisible: boolean;
  levelMenuVisible: boolean;
}

export default class CharViewScreen extends Component<any, State> {
  constructor(props) {
    super(props);
    const state = _.get(props.navigation.state, 'params', null);
    this.state = {
      ...state,
      classMenuVisible: false,
      raceMenuVisible: false,
      levelMenuVisible: false
    };
  }

  render() {
    return (
      <Surface style={Styles.container}>
        <Appbar.Header style={Styles.appbar}>
          <Appbar.Action
            icon="arrow-left"
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
          <Appbar.Content
            title={Constants.manifest.name}
            subtitle={Constants.manifest.version}
          />
        </Appbar.Header>
        <View style={Styles.titleWrapper}>
          <Title>Ficha</Title>
        </View>
        <ScrollView style={Styles.hScrollView}>
          <View style={Styles.homeMenuItems}>
            {/* Nome */}
            <View style={Styles.lineWrapper}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <TextInput
                  label="Nome"
                  mode="outlined"
                  value={this.state.char.name}
                />
              </View>
              <View
                style={{ alignContent: 'center', justifyContent: 'center' }}
              >
                <IconButton
                  icon="shuffle"
                  onPress={() => console.log('Pressed')}
                />
              </View>
            </View>
            {/* Classe */}
            <View style={Styles.lineWrapper}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Menu
                  visible={this.state.classMenuVisible}
                  onDismiss={this._closeAllMenus}
                  anchor={
                    <TextInput
                      label="Classe"
                      mode="outlined"
                      value={this.state.char.charClass}
                      editable={false}
                      onTouchEnd={() => {
                        this.setState({ classMenuVisible: true });
                      }}
                    />
                  }
                >
                  <Menu.Item onPress={() => {}} title="Item 1" />
                  <Menu.Item onPress={() => {}} title="Item 2" />
                  <Menu.Item onPress={() => {}} title="Item 3" />
                </Menu>
              </View>
              <View
                style={{ alignContent: 'center', justifyContent: 'center' }}
              >
                <IconButton
                  icon="shuffle"
                  onPress={() => console.log('Pressed')}
                />
              </View>
            </View>
            {/* Raça */}
            <View style={Styles.lineWrapper}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Menu
                  visible={this.state.raceMenuVisible}
                  onDismiss={this._closeAllMenus}
                  anchor={
                    <TextInput
                      label="Raça"
                      mode="outlined"
                      value={this.state.char.race}
                      editable={false}
                      onTouchEnd={() => {
                        this.setState({ raceMenuVisible: true });
                      }}
                    />
                  }
                >
                  <Menu.Item onPress={() => {}} title="Item 1" />
                  <Menu.Item onPress={() => {}} title="Item 2" />
                  <Menu.Item onPress={() => {}} title="Item 3" />
                </Menu>
              </View>
              <View
                style={{ alignContent: 'center', justifyContent: 'center' }}
              >
                <IconButton
                  icon="shuffle"
                  onPress={() => console.log('Pressed')}
                />
              </View>
            </View>
            {/* Level */}
            <View style={Styles.lineWrapper}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Menu
                  visible={this.state.levelMenuVisible}
                  onDismiss={this._closeAllMenus}
                  anchor={
                    <TextInput
                      label="Level"
                      mode="outlined"
                      value={this.state.char.level.toString()}
                      editable={false}
                      onTouchEnd={() => {
                        this.setState({ levelMenuVisible: true });
                      }}
                    />
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
            {/* END */}
          </View>
        </ScrollView>
      </Surface>
    );
  }

  _closeAllMenus = () => {
    this.setState({
      classMenuVisible: false,
      raceMenuVisible: false,
      levelMenuVisible: false
    });
  };

  _setRandomCharLevel = () => {
    this._setCharLevel(_.sample(_.times(6, num => num + 1)));
  };
  _setCharLevel = (level: number) => {
    this.setState({
      char: {
        ...this.state.char,
        level
      }
    });
    this._closeAllMenus();
  };
}
