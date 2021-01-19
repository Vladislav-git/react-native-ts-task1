import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useC} from '../context/Context'


export default function LoginBtn (navigation:object) {

    const {darkTheme} = useC();

    return (
        <View style={{...styles.View, backgroundColor: darkTheme ? 'black' : 'white',}}>
            <TouchableOpacity
            onPress={() => navigation.navigation.navigate('Login')}
            style={{...styles.Button, backgroundColor: darkTheme ? 'orange' :"#009688",}}
            >
                <Text style={styles.ButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => navigation.navigation.navigate('Register')}
            style={{...styles.Button, backgroundColor: darkTheme ? 'orange' :"#009688",}}
            >
                <Text style={styles.ButtonText}>Register</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    View: {
        height: 800,
        width: 370,
    },
    Button: {
        elevation: 8,
        borderRadius: 10,
        height: 40,
        width: 150,
        alignSelf: 'center',
        justifyContent: 'center',
        display: 'flex',
        marginTop: 140,
    },
    ButtonText: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
    }
});
