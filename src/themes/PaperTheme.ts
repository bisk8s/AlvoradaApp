import { DefaultTheme } from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/src/types';

const fontConfig: FontConfig = {
  regular: {
    fontFamily: 'Rubik-Regular',
    fontWeight: 'normal'
  },
  medium: {
    fontFamily: 'Rubik-Medium',
    fontWeight: 'normal'
  },
  light: {
    fontFamily: 'Rubik-Light',
    fontWeight: 'normal'
  },
  thin: {
    fontFamily: 'Rubik-Light',
    fontWeight: 'normal'
  }
};

const PaperTheme: Theme = {
  ...DefaultTheme,
  fonts: fontConfig,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
    text: '#211d1d'
  }
};

export default PaperTheme;

// INTERFACES
interface FontConfig {
  regular: FontType;
  medium: FontType;
  light: FontType;
  thin: FontType;
}
interface FontType {
  fontFamily: string;
  fontWeight:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
}
