import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import ItemEmprestado from '../model/ItemEmprestado';

let itemListFromLocalStorage = {};
export default class ItemForm extends Component {
    static navigationOptions = {
        title: 'Emprestar Item'
    }
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }
    getInitialState = () => {
        return (new ItemEmprestado(), { isLoading: false });
    }
    _storeDataToLocalStorage = async (Item) => {
        await AsyncStorage.setItem('itemList', JSON.stringify(Item));
    };
    _restoreDataFromLocalStorage = async () => {
        await AsyncStorage.getItem('itemList')
            .then(result => {
                let data = JSON.parse(result);
                console.log(data);
                itemListFromLocalStorage = data !== null ? data : {};
            });
    }
    onCreateItem = async () => {
        let item = new ItemEmprestado();
        item.nomeDoItem = this.state.nomeDoItem;
        item.nomeFavorecido = this.state.nomeFavorecido;
        item.dataDevolucao = this.state.dataDevolucao;
        item.dataEmprestimo = this.state.dataEmprestimo;
        itemListFromLocalStorage.push(item);
        await this._storeDataToLocalStorage(itemListFromLocalStorage);
        this.setState({ isLoading: true });
    }
    componentWillMount() {
        this._restoreDataFromLocalStorage();
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    value={this.state.nomeDoItem}
                    onChangeText={(nomeDoItem => this.setState({ nomeDoItem }))}
                    placeholder="Nome do Item"
                    placeholderTextColor="#707070"
                    style={styles.textinput}
                />
                <TextInput
                    value={this.state.nomeFavorecido}
                    onChangeText={(nomeFavorecido => this.setState({ nomeFavorecido }))}
                    placeholder="Nome do Favorecido"
                    placeholderTextColor="#707070"
                    style={styles.textinput}
                />
                <DatePicker
                    style={{ width: 200 }}
                    date={this.state.dataEmprestimo}
                    mode="date" //The enum of date, datetime and time
                    placeholder="Data de Empréstimo"
                    format="DD-MM-YYYY"
                    confirmBtnText="Confirmar"
                    cancelBtnText="Cancelar"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={(dataEmprestimo) => { this.setState({ dataEmprestimo }) }}
                />
                <DatePicker
                    style={{ width: 200 }}
                    date={this.state.dataDevolucao}
                    mode="date" //The enum of date, datetime and time
                    placeholder="Data de Entrega (Opcional)"
                    format="DD-MM-YYYY"
                    confirmBtnText="Confirmar"
                    cancelBtnText="Cancelar"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={(dataDevolucao) => { this.setState({ dataDevolucao }) }}
                />
                <Button
                    title="Criar"
                    buttonStyle={styles.button}
                    onPress={this.onCreateItem.bind(this)}
                    loading={this.state.isLoading}
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
    button: {
        backgroundColor: '#4A40B2',
        marginTop: 10,
        width: 130,
        borderRadius: 25
    }
});