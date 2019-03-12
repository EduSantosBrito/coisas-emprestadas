import { createStackNavigator, createAppContainer } from 'react-navigation';
import Main from './components/Main';
import Login from './components/Login';
const MainNavigator = createStackNavigator({
  Login: { screen: Login },
  Main: { screen: Main },
}, {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
    initialRouteName: 'Login'
  });
export default App = createAppContainer(MainNavigator);