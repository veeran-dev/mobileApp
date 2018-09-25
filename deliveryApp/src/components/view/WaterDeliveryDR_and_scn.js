import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
  ToastAndroid,
  TouchableOpacity,
  Image
} from 'react-native';

import RNAndroidScanner from 'react-native-android-scanner';

export default class WaterDeliveryDR extends Component {

  state = {
    imageUri: null
  }

  componentWillMount = () => {
    ToastAndroid.show('Listening for SCANNED_RESULT', ToastAndroid.SHORT);
    DeviceEventEmitter.addListener(RNAndroidScanner.SCANNED_RESULT, this.onResult);
  }

  onScan = (preference = 2) => {
    
    // PICKFILE_REQUEST_CODE = 1
    // START_CAMERA_REQUEST_CODE = 2
    // OPEN_CAMERA = 4;
    // OPEN_MEDIA = 5;
    
    RNAndroidScanner.startScan(preference);
  }

  onResult = (image) => {
    ToastAndroid.show('onResult completion callback:', ToastAndroid.SHORT);
    this.setState({imageUri: image.uri})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Text style={styles.welcome}>
            React Native Android Scanner Demo
          </Text>
          <TouchableOpacity onPress={this.onScan.bind(this)}>
            <Text style={styles.scanButton}>
              Start Scan
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
            uri: this.state.imageUri
          }}
            resizeMode="contain"/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  image: {
    width: 150,
    height: 150,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 50,
    alignItems: 'center'
  },
  welcome: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10
  },
  scanButton: {
    fontSize: 17,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 30
  }
});