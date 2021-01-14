import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import loginRegisterBtn from '../components/LoginRegisterBtn';
import loginForm from '../components/LoginForm';
import registerForm from '../components/RegisterForm';
import tabNavigation from './TabNavigation'
import {useC} from '../context/Context'
import mapElement from '../components/MapElement'



const Stack = createStackNavigator();



const MainNavigation = () => {

    const {darkTheme} = useC();

    const options = {
        headerStyle: {
            borderColor: 'gray',
            backgroundColor: darkTheme ? '#06103d' : 'white',
        },
        headerTintColor: darkTheme ? 'white' : 'black',
    }

    return (
        <Stack.Navigator>
            <Stack.Screen name="Login/Register" options={options} component={loginRegisterBtn} />
            <Stack.Screen name="Main" options={options} component={tabNavigation} />
            <Stack.Screen name="Login" options={options} component={loginForm} />
            <Stack.Screen name="Register" options={options} component={registerForm} />
            <Stack.Screen name="Map" options={options} component={mapElement} />
        </Stack.Navigator>
    )
}

export default MainNavigation;