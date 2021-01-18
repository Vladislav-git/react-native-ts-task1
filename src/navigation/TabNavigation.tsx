import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import mainPage from '../components/MainPage';
import settings from '../components/Settings';
import shopList from '../components/ShopList'
import {useC} from '../context/Context'

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigation () {
    
    const {darkTheme} = useC();

    return (
        <Tab.Navigator 
            activeColor={darkTheme ? "white" : 'black'}
            inactiveColor={darkTheme ? '#a69a9b' : "#9ea7b5"}
            barStyle={{ backgroundColor: darkTheme ? '#06103d' : 'white' }}
        >
            <Tab.Screen name='Main' options={{tabBarColor: 'black'}} component={mainPage}/>
            <Tab.Screen name="Settings" component={settings} />
            <Tab.Screen name='Shop List' component={shopList}/>
        </Tab.Navigator>
    );
}