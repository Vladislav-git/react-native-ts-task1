import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import {useC} from '../context/Context'


const MainPage = ({navigation}) => {

  const {darkTheme} = useC();
  
  return (
    <View style={{...styles.View, backgroundColor: darkTheme ? 'black' : 'white',}}>
      <TouchableOpacity
      onPress={() => navigation.navigate('Map')}
      style={{...styles.Button, backgroundColor: darkTheme ? 'red' :"blue",}}
      >
        <Text style={styles.ButtonText}>Go to map</Text>
      </TouchableOpacity>
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
  Button: {
    elevation: 8,
    borderRadius: 10,
    height: 40,
    width: 150,
    alignSelf: 'center',
    justifyContent: 'center',
    display: 'flex',
    marginTop: 220,
},
  ButtonText: {
      fontSize: 14,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
  }
})

export default MainPage;