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
    width
  },
  homeMenuItems: {
    width,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: height - 1000
  },
  nameContainer: {
    // flexDirection: 'row'
  }
});
