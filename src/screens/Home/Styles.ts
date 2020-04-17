import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

export default StyleSheet.create({
  appbar: {
    width
  },
  card: {
    margin: 16,
    width: width * 0.9
  }
});
