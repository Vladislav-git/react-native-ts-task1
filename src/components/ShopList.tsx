import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import {useC, useUpdateC} from '../context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ShopList () {

    const {darkTheme, data} = useC();
    const {updateData} = useUpdateC();

    const [userData, setUserData] = useState(data);
    const [input, setInput] = useState('')

    const filter = () => {
        return userData.shops.filter((item) => input.includes(item.shopname) ? true : false).length === 0 ? userData.shops : userData.shops.filter((item) => input.includes(item.shopname) ? true : false)
    }

    return (
        <View style={{height: 1000, width: '100%', backgroundColor: darkTheme ? 'black' : 'white'}}>
            <TextInput
            placeholderTextColor='grey'
            placeholder='Search'
            value={input}
            onChangeText={(text) => setInput(text)}
            style={{...styles.Input, backgroundColor: darkTheme ? 'black' : 'white',
            color: darkTheme ? 'white' : 'black',}}
            />
            <View style={{height: 450, alignItems: 'center'}}>
            {filter().map((item, index) => {
                return (
                    <View key={index} style={{width: '65%', flexDirection: 'row', borderColor: 'gray', borderWidth: 1}}>
                        <Text style={{...styles.Text, width:'50%' ,color: darkTheme ? 'white' : 'black',}}>{item.shopname}</Text>
                        <TouchableOpacity
                        style={{paddingLeft: '30%'}}
                        onPress={() => {
                            item.isLiked = !item.isLiked
                            setUserData({...userData})
                        }}
                        >
                            <Image
                            style={styles.Like}
                            source={item.isLiked
                            ? require('../../assets/like.png')
                            : require('../../assets/dislike.png')} 
                            />
                        </TouchableOpacity>
                    </View>
                )
            })}
            </View>
            <TouchableOpacity onPress={() => {
                AsyncStorage.setItem(userData.email, JSON.stringify(userData))
                updateData(userData)
            }}
            >
                <Text>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    Like: {
        height: 40,
        width: 40,
    },
    Input: {
        height: 40,
        width: 150,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 10,
        fontSize: 18
    },
    Text: {
        fontSize: 18,
        alignSelf: 'center'
    },
    Button: {
        elevation: 8,
        borderRadius: 10,
        height: 40,
        width: 150,
        alignSelf: 'center',
        justifyContent: 'center',
        display: 'flex',
        marginTop: 30,
    },
    ButtonText: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
    }
})