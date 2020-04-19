import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    width,
    height
  },
  appbar: {
    width
  },
  titleWrapper: {
    padding: 8
  },
  hScrollView: {
    width
  },
  scrollContent: {
    width,
    padding: 8,
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingBottom: height * 0.5
  },
  lineWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 8
  },
  inputWrapper: { flex: 1, marginRight: 8 }
});
