import React, { Component } from 'react';
import { Animated, Easing, View } from 'react-native';
import { Asset } from 'expo-asset';
import { loadAsync } from 'expo-font';
import { AppLoading, SplashScreen } from 'expo';
import Constants from 'expo-constants';
import { Title } from 'react-native-paper';
import Theme from '../../themes/PaperTheme';

import _ from 'lodash';

import Logo from '../../icons/Logo';
import Styles from './Styles';

interface Props {
  navigation?: any;
  callback?: () => void;
}

interface State {
  mayFinish: boolean;

  spin: Animated.Value;
  fade: Animated.Value;
  duration: number;
  fadeDurarion: number;
}

class LoadingScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      mayFinish: false,

      spin: new Animated.Value(0),
      fade: new Animated.Value(1),
      duration: 2000,
      fadeDurarion: 300
    };
  }

  _cacheResourcesAsync = async () => {
    const images = [];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    const uris = [
      // "http://mirror.filearena.net/pub/speed/SpeedTest_16MB.dat"
    ];

    const cacheUris = uris.map(uri => {
      return Asset.fromURI(uri).downloadAsync();
    });

    const fonts = {
      'Rubik-Black': require('../../../assets/fonts/Rubik-Black.ttf'),
      'Rubik-BlackItalic': require('../../../assets/fonts/Rubik-BlackItalic.ttf'),
      'Rubik-Bold': require('../../../assets/fonts/Rubik-Bold.ttf'),
      'Rubik-BoldItalic': require('../../../assets/fonts/Rubik-BoldItalic.ttf'),
      'Rubik-Italic': require('../../../assets/fonts/Rubik-Italic.ttf'),
      'Rubik-Light': require('../../../assets/fonts/Rubik-Light.ttf'),
      'Rubik-LightItalic': require('../../../assets/fonts/Rubik-LightItalic.ttf'),
      'Rubik-Medium': require('../../../assets/fonts/Rubik-Medium.ttf'),
      'Rubik-MediumItalic': require('../../../assets/fonts/Rubik-MediumItalic.ttf'),
      'Rubik-Regular': require('../../../assets/fonts/Rubik-Regular.ttf')
    };

    const cacheFonts = loadAsync(fonts);

    const cache = _.concat(cacheImages, cacheUris, cacheFonts);

    return _.last([...(await Promise.all(cache))]);
  };

  componentDidMount() {
    SplashScreen.hide();
    this.doSwing();
  }

  doSwing() {
    if (!this.state.mayFinish) {
      this.state.spin.setValue(0);
      Animated.timing(this.state.spin, {
        toValue: 100,
        duration: this.state.duration,
        easing: Easing.linear
      }).start(() => {
        this.doSwing();
      });
    } else {
      this.state.fade.setValue(1);
      Animated.timing(this.state.fade, {
        toValue: 0,
        duration: this.state.fadeDurarion,
        easing: Easing.linear
      }).start(() => {
        this.onFinish();
      });
    }
  }

  onFinish() {
    this.props.callback();
  }

  onError(error) {
    console.warn(error);
  }

  render() {
    const rotation = this.state.spin.interpolate({
      inputRange: [0, 25, 50, 75, 100],
      outputRange: ['0deg', '-10deg', '0deg', '10deg', '0deg']
    });

    const boomerang = {
      transform: [
        {
          rotate: rotation
        }
      ]
    };
    const mustFade = {
      opacity: this.state.fade,
      transform: [
        {
          scale: this.state.fade
        }
      ]
    };

    return (
      <>
        <View style={Styles.container}>
          <Animated.View style={mustFade}>
            <Animated.View style={boomerang}>
              <Logo
                style={{ width: 50, height: 50 }}
                stroke={Theme.colors.primary}
              />
            </Animated.View>
          </Animated.View>
          {/* <Title>{Constants.manifest.name}</Title> */}
        </View>

        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ mayFinish: true })}
          onError={this.onError}
          autoHideSplash={true}
        />
      </>
    );
  }
}

export default LoadingScreen;
