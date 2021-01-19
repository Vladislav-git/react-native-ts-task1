import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {getLocation} from '../location/Location';
import * as Location from 'expo-location';
import {useC, useUpdateC} from '../context/Context';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MapDark, MapDefault} from '../mapstyles/MapStyles'
import {shopValid} from '../validation/validation'

export default function MapElement ({navigation}) {

    const {darkTheme, data} = useC();
    const {updateData} = useUpdateC();

    const [coords, setCoords] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [userData, setUserData] = useState(data)
    const [shop, setShop] = useState({shopname: '', shoplat: '', shoplon: '', shoptype: 'Supermarket', isLiked: false})
    const [like, setLike] = useState(false)
    const [input, setInput] = useState('')
    

    const newLocation = async () => {
        const location = await getLocation();
        if (location != undefined){
            const name = await Location.reverseGeocodeAsync(location.coords)
        }
        setCoords({lat: location.coords.latitude, lon: location.coords.longitude})
    }

    const Likefilter = () => {
        return userData.shops.filter((item) => item.isLiked ? true : false)
    }

    const filter = () => {
        return userData.shops.filter((item) => input.includes(item.shopname) ? true : false).length === 0 ? userData.shops : userData.shops.filter((item) => input.includes(item.shopname) ? true : false)
    }

    useEffect(() => {newLocation()},[])

    return (
        <View style={{backgroundColor: darkTheme ? 'black' : 'white', height: 1000, width: '100%'}}>
            <View style={{...styles.container, backgroundColor: darkTheme ? 'black' : 'white'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', alignSelf:'center', flex: 1, }}>
                    <TextInput
                    placeholder='Search'
                    style={{...styles.Input, backgroundColor: darkTheme ? 'black' : 'white',
                    color: darkTheme ? 'white' : 'black', alignItems: 'center', marginTop: 0, marginLeft: 50}}
                    value={input}
                    onChangeText={(text) => setInput(text)}
                    />
                    <TouchableOpacity style={{alignItems: 'center',height: 50, width: 100}} onPress={() => setLike(!like)}>
                        <Image style={styles.Like} source={like ? require('../../assets/like.png') : require('../../assets/dislike.png')}/>
                    </TouchableOpacity>
                </View>

                {coords != null
                ?
                <MapView
                customMapStyle={darkTheme ? MapDark : MapDefault}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: coords.lat,
                    longitude: coords.lon,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                    <Marker coordinate={{latitude: coords.lat, longitude: coords.lon}} />
                    {userData.shops.length 
                    ? ((like ? Likefilter() : userData.shops) && (input != '' ? filter() : userData.shops)).map((item, index) => (
                        <Marker
                        key={index}
                        coordinate={{latitude: Number.parseInt(item.shoplat), longitude: Number.parseInt(item.shoplon)}}
                        title={item.shopname}
                        >
                            {item.shoptype === 'Supermarket'
                            ? <Image
                            source={require('../../assets/Supermarket.png')}
                            style={{width: 40, height: 40}}
                            resizeMode="stretch"
                            />
                            : null}
                            {item.shoptype === 'Bakery'
                            ? <Image
                            source={require('../../assets/Bakery.png')}
                            style={{width: 40, height: 40}}
                            resizeMode="stretch"
                            />
                            : null}
                            {item.shoptype === 'Book Shop'
                            ? <Image
                            source={require('../../assets/BookStore.png')}
                            style={{width: 40, height: 40}}
                            resizeMode="stretch"
                            />
                            : null}
                            {item.shoptype === 'Boutique'
                            ? <Image
                            source={require('../../assets/Boutique.png')}
                            style={{width: 40, height: 40}}
                            resizeMode="stretch"
                            />
                            : null}
                            {item.shoptype === 'Drug Store'
                            ? <Image
                            source={require('../../assets/DrugStore.png')}
                            style={{width: 40, height: 40}}
                            resizeMode="stretch"
                            />
                            : null}
                            
                            <Callout
                            tooltip
                            onPress={() => {
                                item.isLiked = !item.isLiked
                                setUserData({...userData})
                                AsyncStorage.setItem(userData.email, JSON.stringify(userData))
                                updateData(userData)
                            }}
                            >
                                <View style={{...styles.Modal, height: 100, width: 150, marginTop: 160, backgroundColor: darkTheme ? 'grey' : 'white'}}>
                                    <Text style={{color: darkTheme ? 'white' : 'black', fontWeight: 'bold', fontSize: 18, alignSelf: 'center', marginBottom: 8}}>{item.shopname}</Text>
                                    <Image
                                    style={{height: 40, width: 40, alignSelf: "center", marginTop: 10}} 
                                    source={item.isLiked
                                    ? require('../../assets/like.png')
                                    : require('../../assets/dislike.png')
                                    }
                                    />
                                </View>
                            </Callout>
                        </Marker>
                    ))
                    : null}
                </MapView>
                : null}
            </View>
            
            <View style={{backgroundColor: darkTheme ? 'black' : 'white'}}>
                <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{...styles.Button, backgroundColor: darkTheme ? 'blue' :"#009688",}}
                >
                    <Text style={styles.ButtonText}>Add shop</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={{...styles.Modal, backgroundColor: darkTheme ? 'black' : 'white', borderWidth: 2, borderColor: darkTheme ? 'white' : 'black'}}>
                    <Text style={{alignSelf: 'center', fontSize: 18, color: darkTheme ? 'white' : 'black'}}>Specify your shop</Text>
                    <TextInput
                    style={{...styles.Input, backgroundColor: darkTheme ? 'black' : 'white',
                    color: darkTheme ? 'white' : 'black'}}
                    placeholder='shop name'
                    value={shop.shopname}
                    onChangeText={shopname => setShop({...shop, shopname})}
                    />
                    <TextInput
                    style={{...styles.Input, backgroundColor: darkTheme ? 'black' : 'white',
                    color: darkTheme ? 'white' : 'black'}}
                    placeholder='lat'
                    value={shop.shoplat}
                    onChangeText={shoplat => setShop({...shop, shoplat})}
                    />
                    <TextInput
                    style={{...styles.Input, backgroundColor: darkTheme ? 'black' : 'white',
                    color: darkTheme ? 'white' : 'black'}}
                    placeholder='lon'
                    value={shop.shoplon}
                    onChangeText={shoplon => setShop({...shop, shoplon})}
                    />
                    <Picker selectedValue={shop.shoptype} style={{...styles.Picker, backgroundColor: darkTheme ? 'black' : 'white', color: darkTheme ? 'white' : 'black'}} onValueChange={(shoptype) => setShop({...shop, shoptype})}>
                        <Picker.Item label="Supermarket" value='Supermarket'  />
                        <Picker.Item label="Bakery" value='Bakery' />
                        <Picker.Item label="Book Shop" value='Book Shop' />
                        <Picker.Item label="Boutique" value="Boutique" />
                        <Picker.Item label="Drug Store" value="Drug Store" />
                    </Picker>
                    <TouchableOpacity
                    onPress={() => {
                        userData.shops.push(shop)
                        if (shopValid(userData) === '') {
                            setUserData(userData)
                            AsyncStorage.setItem(userData.email, JSON.stringify(userData))
                            updateData(userData)
                            setModalVisible(false)
                        } else {
                            alert('error try again')
                            setModalVisible(false)
                        }
                        
                    }}
                    style={{...styles.Button, backgroundColor: darkTheme ? 'blue' :"#009688", marginTop: 0}}
                    >
                        <Text style={styles.ButtonText}>Add shop</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    Like: {
        height: 40,
        width: 40,
        marginTop: 5
    },
    Picker: {
        height: 40,
        width: 150,
        alignSelf: "center",
    },
    Modal : {
        marginTop: 120,
        height: 300,
        width: 300,
        borderWidth: 1,
        borderRadius: 20,
        color: 'grey',
        justifyContent: "center",
        alignSelf: "center",
    },
    Input: {
        height: 40,
        width: 150,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
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
        marginTop: 30,
    },
    ButtonText: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
    },
    container: {
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      height: 300,
      width: 400,
    },
   });