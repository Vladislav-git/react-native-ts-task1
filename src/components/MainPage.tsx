import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import {useC} from '../context/Context'



const MainPage = ({navigation}) => {

  const {darkTheme} = useC();
  

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
    Button: {
      elevation: 8,
      backgroundColor: darkTheme ? 'red' :"blue",
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
  
  return (
    <View style={styles.View}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Map')}
        style={styles.Button}
      >
        <Text style={styles.ButtonText}>Go to map</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MainPage;