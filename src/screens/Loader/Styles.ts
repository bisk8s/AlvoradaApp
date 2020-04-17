import { StyleSheet, Dimensions } from 'react-native';

import Theme from '../../themes/PaperTheme';
const { width, height } = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    width,
    height
  },
  logoPart: {
    width: 130,
    height: 130,
    position: 'absolute'
  }
});
