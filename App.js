import React from 'react';
import { Alert, Button, TextInput, StyleSheet, View, AsyncStorage } from 'react-native';
let userData = {};
_storeData = async (credentials) => {
  try {
    await AsyncStorage.setItem('credentials', JSON.stringify(credentials));
  } catch (error) {
    console.log(error.message);
  }
};
_retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('credentials');
    if (value !== null) {
      userData = JSON.parse(value);
    }
  } catch (error) {
    console.log(error.message);
  }
};
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  }
  onLogin() {
    const { username, password } = this.state;
    _storeData({ username, password });
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.username}
          onChangeText={(username => this.setState({ username }))}
          placeholder="Username"
          style={styles.textinput}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password => this.setState({ password }))}
          placeholder="Password"
          style={styles.textinput}
          secureTextEntry={true}
        />
        <Button
          title="Login"
          onPress={this.onLogin.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    borderRadius: 50
  },
});
