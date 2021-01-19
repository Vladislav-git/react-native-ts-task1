import React, {useState} from 'react';
import {TouchableOpacity, Text, View, TextInput, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useC, useUpdateC} from '../context/Context'

export default function LoginForm (navigation:object) {

    const {darkTheme} = useC();
    const {updateData} = useUpdateC();

    const initialState = {email: '', password: ''}
    const [state, setState] = useState(initialState);
    
    return (
        <View style={{...styles.MainView, backgroundColor: darkTheme ? 'black' : 'white'}}>
            <View style={{...styles.View, backgroundColor: darkTheme ? 'black' : 'white'}}>
                <Text style={{color: darkTheme ?  'white' : 'black',}}>Enter your email:</Text>
                <TextInput 
                style={{...styles.Input, backgroundColor: darkTheme ? 'black' : 'white', color: darkTheme ? 'white' : 'black',}}
                placeholder='Your email'
                value={state.email}
                placeholderTextColor='grey'
                onChangeText={(text) => setState({...state, email: text})}
                />
            </View>
            <View style={{...styles.View, backgroundColor: darkTheme ? 'black' : 'white'}}>
                <Text style={{color: darkTheme ?  'white' : 'black',}}>Enter your password:</Text>
                <TextInput 
                style={{...styles.Input, backgroundColor: darkTheme ? 'black' : 'white', color: darkTheme ? 'white' : 'black',}}
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
                    alert(err)
                    return err;
                }
            }
            }
            style={{...styles.Button, backgroundColor: darkTheme ? 'orange' :"#009688",}}
            >
                <Text style={styles.ButtonText}>Log in</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    MainView: {
        height: 800,
        width: 370,
    },
    View: {
        alignSelf: 'center',
        fontSize: 16,
        marginTop: 30,
    },
    Input: {
        height: 40,
        width: 250,
        borderColor: 'gray',
        borderWidth: 1,
        alignSelf: 'center', 
        marginTop: 10,
    },
    Button: {
        elevation: 8,
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




