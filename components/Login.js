import React, { Component } from 'react'
import { Button } from 'react-native-elements';
import { ImageBackground, TextInput, StyleSheet, Text, AsyncStorage } from 'react-native';

_storeDataToLocalStorage = async (credentials) => {
    await AsyncStorage.setItem('credentials', JSON.stringify(credentials));
};

export default class Login extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }

    loginAction() {
        if (this.state.isLogged) {
            this.onLogin();
        }
    }

    async fetchName() {
        await AsyncStorage.getItem('credentials')
            .then(result => {
                let credentials = JSON.parse(result);
                credentials !== null ? this.setState({ username: credentials.username, password: credentials.password, isLogged: true, isLoading: true }) : null;
            });
        await this.loginAction();
    }

    onLogin() {
        //TO-DO: Verificar se tá em branco
        const { username, password } = this.state;
        _storeDataToLocalStorage({ username, password });
        this.props.navigation.navigate('Main');
        this.setState({ isLoading: false });
    }
    getInitialState() {
        return {
            username: '',
            password: '',
            isLogged: false,
            isLoading: false
        };
    }
    componentWillMount() {
        this.setState(this.getInitialState());
        this.fetchName();
    }

    render() {
        return (
            <ImageBackground source={require('../assets/background-image.jpg')} style={styles.container}>
                <Text style={styles.title}>Coisas Emprestadas</Text>
                <TextInput
                    value={this.state.username}
                    onChangeText={(username => this.setState({ username }))}
                    placeholder="Username"
                    placeholderTextColor="#707070"
                    style={styles.textinput}
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={(password => this.setState({ password }))}
                    placeholder="Password"
                    placeholderTextColor="#707070"
                    style={styles.textinput}
                    secureTextEntry={true}
                />
                <Button
                    title="Login"
                    buttonStyle={styles.button}
                    onPress={this.onLogin.bind(this)}
                    loading={this.state.isLoading}
                />
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textinput: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'white',
        marginBottom: 10,
        borderRadius: 50
    },
    title: {
        color: 'white',
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 50
    },
    button: {
        backgroundColor: '#4A40B2',
        marginTop: 10,
        width: 130,
        borderRadius: 25
    }
});