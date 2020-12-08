import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

/*import { WEATHER_API_KEY } from 'react-native-dotenv'; */

const WEATHER_API_KEY = "ce00af567f3ebd4645b36309641d801a"
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {

  const [errorMessage, setErrorMessage] = useState(null); 
  const [currentWeather, setCurrentWeather] = useState(null); 
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

      // make call to OpenWeather API
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`; 

      const response = await fetch(weatherUrl); 

      const result = await response.json(); 

      if(response.ok) {
        setCurrentWeather(result); 
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      alert(`Unable to load page due to the following error: ${error}`); 
    }
  }

  if(currentWeather) {

    const { main : {temp}} = currentWeather; 
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Welcome to your new app!</Text>
        {/*<Text>Today's temperature: {temp}</Text>*/}
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto"/>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
