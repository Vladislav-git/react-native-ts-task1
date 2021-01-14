import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {getLocation} from '../location/Location';
import * as Location from 'expo-location';
import {useC, useUpdateC} from '../context/Context';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MapElement ({navigation}) {

    const {darkTheme, data} = useC();
    const {updateData} = useUpdateC();

    const styles = StyleSheet.create({
        Picker: {
            height: 50,
            width: 150,
            alignSelf: "center",
        },
        Modal : {
            marginTop: 120,
            height: 300,
            width: 300,
            borderWidth: 1,
            borderRadius: 20,
            justifyContent: "center",
            alignSelf: "center",
            backgroundColor: 'white',
        },
        Input: {
            height: 40,
            width: 150,
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
            marginTop: 30,
        },
        ButtonText: {
            fontSize: 14,
            color: "#fff",
            fontWeight: "bold",
            alignSelf: "center",
        },
        container: {
          height: 300,
          width: 400,
          justifyContent: 'flex-end',
          alignItems: 'center',
        },
        map: {
          ...StyleSheet.absoluteFillObject,
        },
       });

    const [coords, setCoords] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [userData, setUserData] = useState(data)
    const [shop, setShop] = useState({shopname: '', shoplat: '', shoplon: '', shoptype: 'Supermarket'})

    const newLocation = async () => {
        const location = await getLocation();
        if (location != undefined){
            const name = await Location.reverseGeocodeAsync(location.coords)
        }
        setCoords({lat: location.coords.latitude, lon: location.coords.longitude})
    }

    useEffect(() => {newLocation()},[])
    // console.log(userData)
    return (
        <View>
            <View style={styles.container}>
                {coords != null
                ?
                <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={{
                    latitude: coords.lat,
                    longitude: coords.lon,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                    <Marker coordinate={{latitude: coords.lat, longitude: coords.lon}} />
                    {userData.shops.length > 0
                    ? userData.shops.map((item, index) => (
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
                        </Marker>
                    ))
                    : null}
                </MapView>
                : null}
            </View>
        
            <View>
                <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.Button}
                >
                    <Text style={styles.ButtonText}>Add shop</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.Modal}>
                    <Text style={{alignSelf: 'center', fontSize: 18}}>Specify your shop</Text>
                    <TextInput
                    style={styles.Input}
                    placeholder='shop name'
                    value={shop.shopname}
                    onChangeText={shopname => setShop({...shop, shopname})}
                    />
                    <TextInput
                    style={styles.Input}
                    placeholder='lat'
                    value={shop.shoplat}
                    onChangeText={shoplat => setShop({...shop, shoplat})}
                    />
                    <TextInput
                    style={styles.Input}
                    placeholder='lon'
                    value={shop.shoplon}
                    onChangeText={shoplon => setShop({...shop, shoplon})}
                    />
                    <Picker selectedValue={shop.shoptype} style={styles.Picker} onValueChange={(shoptype) => setShop({...shop, shoptype})}>
                        <Picker.Item label="Supermarket" value='Supermarket'  />
                        <Picker.Item label="Bakery" value='Bakery' />
                        <Picker.Item label="Book Shop" value='Book Shop' />
                        <Picker.Item label="Boutique" value="Boutique" />
                        <Picker.Item label="Drug Store" value="Drug Store" />
                    </Picker>
                    <TouchableOpacity
                    onPress={() => {
                        const newData = userData.shops.push(shop)
                        setUserData(newData)
                        AsyncStorage.setItem(userData.email, JSON.stringify(userData))
                        console.log(userData)
                        setModalVisible(false)
                    }}
                    style={{...styles.Button, marginTop: 0}}
                    >
                        <Text style={styles.ButtonText}>Add shop</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

        </View>
    )
}