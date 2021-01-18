import React, {useState} from 'react';
import {TouchableOpacity, Text, View, TextInput, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useC} from '../context/Context';
import {registrationValid} from '../validation/validation';

const default_model = {
    firstname: '',
    secondname: '',
    email: '',
    password: '',
    shops: [],
};

export default function RegisterForm (navigation:object) {

    const {darkTheme} = useC();

    const initialState = {model: default_model};
    const [state, setState] = useState(initialState);
    const {model} = state;

    const styles = StyleSheet.create({
        MainView: {
            height: 800,
            width: 370,
            backgroundColor: darkTheme ? 'black' : 'white',
        },
        Text: {
            marginTop: 30,
            color: darkTheme ? 'white' : 'black',
        },
        View: {
            alignSelf: 'center',
            fontSize: 16,
            backgroundColor: darkTheme ? 'black' : 'white',
        },
        Input: {
            height: 40,
            width: 250,
            borderColor: 'gray',
            borderWidth: 1,
            alignSelf: 'center',
            marginTop: 10,
            backgroundColor: darkTheme ? 'black' : 'white',
            color: darkTheme ? 'white' : 'black', 
        },
        Button: {
            elevation: 8,
            backgroundColor: darkTheme ? 'orange' :"#009688",
            borderRadius: 10,
            height: 40,
            width: 150,
            alignSelf: 'center',
            justifyContent: 'center',
            display: 'flex',
            marginTop: 50,
        },
        ButtonText: {
            fontSize: 14,
            color: "#fff",
            fontWeight: "bold",
            alignSelf: "center",
        }
    });
    
    return (
        <View style={styles.MainView}>
            <View style={styles.View}>
                <Text style={styles.Text}>Firstname:</Text>
                <TextInput 
                    style={styles.Input}
                    placeholder='Enter your Firstname'
                    placeholderTextColor='grey'
                    value={model.firstname}
                    onChangeText={(text) => setState({...state, model:{...state.model, firstname: text}})}
                />
                <Text style={styles.Text}>Secondname:</Text>
                <TextInput 
                    style={styles.Input}
                    placeholder='Enter your Secondname'
                    placeholderTextColor='grey'
                    value={model.secondname}
                    onChangeText={(text) => setState({...state, model:{...state.model, secondname: text}})}
                />
                <Text style={styles.Text}>Email:</Text>
                <TextInput 
                    style={styles.Input}
                    placeholder='Enter your email'
                    placeholderTextColor='grey'
                    value={model.email}
                    onChangeText={(text) => setState({model:{...state.model, email: text}})}
                />
                <Text style={styles.Text}>Password:</Text>
                <TextInput 
                    style={styles.Input}
                    placeholder='Enter your password'
                    placeholderTextColor='grey'
                    value={model.password}
                    onChangeText={(text) => setState({model:{...state.model, password: text}})}
                />
            </View>
            <TouchableOpacity
                onPress={async () => {
                    if (registrationValid(state.model).error === null) {
                        let user = await AsyncStorage.getItem(state.model.email);
                        let parsedUser = JSON.parse(user);
                        if (parsedUser === null) {
                            AsyncStorage.setItem(state.model.email, JSON.stringify(state.model))
                            navigation.navigation.navigate('Login')
                        } else
                            alert('try again')
                        } 
                }
                }
                style={styles.Button}
            >
                <Text style={styles.ButtonText}>Sign in</Text>
            </TouchableOpacity>
        </View>
    )
}


