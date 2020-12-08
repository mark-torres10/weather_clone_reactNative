import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

export default function App() {

  const [errorMessage, setErrorMessage] = useState(null); 
  // run at start
  useEffect(()=> {
    // use async load function
    load()
  }, []); 

  async function load() {
    try {

      // get permission to get location
      let { status } = await Location.requestPermissionsAsync(); 

      if(status != "granted") {
        setErrorMessage("Access to the location is needed in order to run the app"); 
        return
      }

      // get location
      const location = await Location.getCurrentPositionAsync();
      
      const {latitude, longitude} = location.coords; 
      alert(`Latitude: ${latitude}, Longitude: ${longitude}`); 

    } catch (error) {

    }
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Welcome to your new app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
