import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Home';
import CharView from '../screens/CharView';

export default createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false
    }
  },
  CharView: {
    screen: CharView,
    navigationOptions: {
      headerShown: false
    }
  }
});
