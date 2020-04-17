import { createAppContainer } from 'react-navigation';

import stackNavigator from './MainStackNavigator';

const Routes = createAppContainer(stackNavigator);
export default Routes;
