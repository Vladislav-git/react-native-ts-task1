import React, {useState, useContext} from 'react';
import {TouchableOpacity, Text, View, TextInput, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useC, useUpdateC} from '../context/Context'
// import {connect} from 'react-redux';
// import { logger } from 'react-native-logs';

// let log = logger.createLogger();


export default function LoginForm (navigation:object) {

    const {darkTheme, data} = useC();
    const {updateData} = useUpdateC();

    const initialState = {email: '', password: ''}
    const [state, setState] = useState(initialState);

    const styles = StyleSheet.create({
        Text: {
            color: darkTheme ?  'white' : 'black',
        },
        MainView: {
            height: 800,
            width: 370,
            backgroundColor: darkTheme ? 'black' : 'white',
        },
        View: {
            alignSelf: 'center',
            fontSize: 16,
            marginTop: 30,
            backgroundColor: darkTheme ? 'black' : 'white',
        },
        Input: {
            height: 40,
            width: 250,
            borderColor: 'gray',
            borderWidth: 1,
            alignSelf: 'center',
            backgroundColor: darkTheme ? 'black' : 'white',
            color: darkTheme ? 'white' : 'black', 
            marginTop: 10,
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
                <Text style={styles.Text}>Enter your email:</Text>
                <TextInput 
                    style={styles.Input}
                    placeholder='Your email'
                    value={state.email}
                    placeholderTextColor='grey'
                    onChangeText={(text) => setState({...state, email: text})}
                />
            </View>
            <View style={styles.View}>
                <Text style={styles.Text}>Enter your password:</Text>
                <TextInput 
                    style={styles.Input}
                    placeholder='Your password'
                    placeholderTextColor='grey'
                    value={state.password}
                    onChangeText={(text) => setState({...state, password: text})}
                />
            </View>
            
            <TouchableOpacity
                onPress={async () => {
                    try {
                        let user:object = await AsyncStorage.getItem(state.email);
                        let parsedUser = JSON.parse(user);
                        if (parsedUser.password === state.password) {
                            updateData(parsedUser)
                            return navigation.navigation.navigate('Main');
                        }
                    } catch (err) {
                        return err;
                    }
                }
                }
                style={styles.Button}
            >
                <Text style={styles.ButtonText}>Log in</Text>
            </TouchableOpacity>
        </View>
    )
}





