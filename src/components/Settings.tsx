import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox'
import {useC, useUpdateC} from '../context/Context'
import {getLocation} from '../location/Location';
import * as Location from 'expo-location';

const Settings = () => {

    const {darkTheme} = useC();
    const {toggleTheme} = useUpdateC();

    const [name, setName] = useState(null)

    const getNameLocation = async () => {
        const location = await getLocation();
        if (location != undefined){
            const name = await Location.reverseGeocodeAsync(location.coords)
            setName(name[0].city)
        }
        return;
    }

    useEffect(() => {getNameLocation()},[])



    return (
        <View style={{...styles.View, backgroundColor: darkTheme ? 'black' : 'white',}}>
            <CheckBox
            style={styles.Box}
            value={darkTheme}
            onValueChange={toggleTheme}
            tintColors={{ true: 'white', false: 'black' }}
            />
            {darkTheme
                ? <Text style={{color: darkTheme ? 'white' : 'black',}}>Change to light theme</Text>
                : <Text style={{color: darkTheme ? 'white' : 'black',}}>Change to dark theme</Text>
            }
            <Text style={{...styles.Label, color: darkTheme ? 'white' : 'black',}}>You are in: {name}</Text>
        </View>
    ); 
}

const styles = StyleSheet.create({
    View: {
        height: 800,
        width: 400,
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        fontSize: 16,
    },
    Box: {
        marginTop: 200,
        alignSelf: 'center',
    },
    Label: {
        marginTop: 200,
    }
})

export default Settings;