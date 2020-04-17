import Constants from 'expo-constants';
import React, { Component } from 'react';
import _ from 'lodash';

import { Appbar } from 'react-native-paper';

import Styles from './Styles';

export default class HomeScreeen extends Component {
  render() {
    return (
      <>
        <Appbar.Header style={Styles.appbar}>
          <Appbar.Action icon="menu" onPress={() => {}} />
          <Appbar.Content title={Constants.manifest.name} subtitle="HOME" />
          <Appbar.Action icon="account-arrow-left" onPress={() => {}} />
        </Appbar.Header>
      </>
    );
  }
}
