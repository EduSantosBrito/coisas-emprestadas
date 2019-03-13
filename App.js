import { createStackNavigator, createAppContainer } from 'react-navigation';
import Main from './components/Main';
import Login from './components/Login';
import ItemForm from './components/ItemForm'
const MainNavigator = createStackNavigator({
  Login: {
    screen: Login
  },
  Main: {
    screen: Main
  },
  ItemForm: {
    screen: ItemForm,
  }
}, {
    initialRouteName: 'Login'
  });
export default App = createAppContainer(MainNavigator);