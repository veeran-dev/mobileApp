import React, { Component } from 'react';
import MapView from 'react-native-maps';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions
} from 'react-native';
import Header from '../common/Header'
import colors from '../../assets/styles/colors.js';

const { width, height } = Dimensions.get('window');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default class Addresses extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      initialPosition:{
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        LongitudeDelta: 0,
      },
      markerPosition:{
        latitude: 0,
        longitude: 0,
      }
    };
  }

  watchID = null;
  componentDidMount(){
    navigator.geolocation.currentPosition((position) => {
      var lat = parseFloat(position.coords.latitude);
      var lon = parseFloat(position.coords.longitude);
      var initialRegion ={
        latitude: lat,
        longitude: lon,
        latitudeDelta: LATITUDE_DELTA,
        LongitudeDelta: LONGITUDE_DELTA,
      }
      this.setState({initialPosition: initialRegion, markerPosition: initialRegion})
    },
    (error) => console.log(error),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    this.watchID = navigator.geolocation.watchPosition((position)=>{
      var lat = parseFloat(position.coords.latitude);
      var lon = parseFloat(position.coords.longitude);
      var lastRegion ={
        latitude: lat,
        longitude: lon,
        latitudeDelta: LATITUDE_DELTA,
        LongitudeDelta: LONGITUDE_DELTA,
      }
      this.setState({initialPosition: lastRegion, markerPosition: lastRegion})
    })
  }

  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View  style={styles.container}>
        <Header header={"Select Address"} />
        <MapView
          initialRegion = {this.state.initialPosition}>
          <MapView.Marker
            coordinate={this.state.markerPosition}> 
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
  }
});