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

    const styles = StyleSheet.create({
        Text: {
            color: darkTheme ? 'white' : 'black',
        },
        View: {
            height: 800,
            width: 400,
            flex: 1,
            backgroundColor: darkTheme ? 'black' : 'white',
    
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
            color: darkTheme ? 'white' : 'black',
        }
    })

    return (
        <View style={styles.View}>
            <CheckBox
                style={styles.Box}
                value={darkTheme}
                onValueChange={toggleTheme}
                tintColors={{ true: 'white', false: 'black' }}
            />
            {darkTheme
                ? <Text style={styles.Text}>Change to light theme</Text>
                : <Text style={styles.Text}>Change to dark theme</Text>
            }
            <Text style={styles.Label}>You are in: {name}</Text>
        </View>
    ); 
}

export default Settings;