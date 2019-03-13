import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, View, Text } from 'react-native';
import { Button } from 'react-native-elements';

_deleteDataFromLocalStorage = async () => {
    await AsyncStorage.removeItem('credentials');
}
export default class Main extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }
    getInitialState = () => {
        return { username: '' }
    }
    onLogout = () => {
        _deleteDataFromLocalStorage();
        this.props.navigation.navigate('Login');
    }
    getUsernameFromLocalStorage = async () => {
        await AsyncStorage.getItem('credentials').then(result => {
            let credentials = JSON.parse(result);
            credentials !== null ? this.setState({ username: credentials.username }) : null;
        })
    }
    componentWillMount() {
        this.getUsernameFromLocalStorage();
    }
    lendItem = () => {
        this.props.navigation.navigate('ItemForm');
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Seja bem vindo {this.state.username}!</Text>
                <Button title="Sair"
                    buttonStyle={styles.button}
                    onPress={this.onLogout.bind(this)} />
                <Button title="Emprestar"
                    buttonStyle={styles.button}
                    onPress={this.lendItem.bind(this)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#4A40B2',
        marginTop: 10,
        width: 130,
        borderRadius: 25,

    }
})
