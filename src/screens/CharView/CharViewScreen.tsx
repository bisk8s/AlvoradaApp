import Constants from 'expo-constants';
import React, { Component } from 'react';
import _ from 'lodash';

import { Appbar, Title, Button, TextInput } from 'react-native-paper';

import Styles from './Styles';
import { ScrollView, View } from 'react-native';

import LocalStorage from '../../services/LocalStorage';
import { AlvoradaChar } from '../../core/Char';
import { CategoryIconType } from '../../icons/CategoryIcon';

interface State {
  id: number;
  char: AlvoradaChar;
}

export default class CharViewScreen extends Component<any, State> {
  constructor(props) {
    super(props);
    const state = _.get(props.navigation.state, 'params', null);
    console.log(state);
    this.state = state;
  }

  render() {
    return (
      <View style={Styles.container}>
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
          <TextInput placeholder="Nome" value={this.state.char.name} />
        </View>
      </View>
    );
  }
}
