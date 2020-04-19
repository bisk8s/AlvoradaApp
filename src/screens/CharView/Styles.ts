import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    width,
    height,
    paddingBottom: 30
  },
  appbar: {
    width
  },
  titleWrapper: {
    padding: 8
  },
  hScrollView: {
    flex: 1,
    width
  },
  homeMenuItems: {
    width,
    padding: 8,
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  },
  lineWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 8
  },
  inputWrapper: { flex: 1, marginRight: 8 }
});
