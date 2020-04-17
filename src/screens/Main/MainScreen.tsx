import React, { Component } from 'react';
import { AppState } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import PaperTheme from '../../themes/PaperTheme';

import Routes from '../../routes';
import Loader from '../Loader';

interface Props {}
interface State {
  isReady: boolean;
  appFocusState: 'inactive' | 'background' | 'active' | 'none';
}

export default class MainScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      appFocusState: 'none'
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appFocusState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // App has come to the foreground
    } else {
      // App has gone to the background
    }
    this.setState({ appFocusState: nextAppState });
  };

  render() {
    switch (true) {
      case !this.state.isReady:
        return (
          <Loader
            callback={() => {
              this.setState({ isReady: true });
            }}
          />
        );
      default:
        return (
          <PaperProvider theme={PaperTheme}>
            <Routes />
          </PaperProvider>
        );
    }
  }
}
