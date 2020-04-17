import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import Main from './src/screens/Main';

export default class App extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <Main />
      </>
    );
  }
}
