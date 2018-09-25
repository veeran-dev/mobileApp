import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { connect } from 'react-redux'
import { RNCamera } from 'react-native-camera';
import Scanner from 'react-native-scan-doc'
import Header from '../common/Header'
import colors from '../../assets/styles/colors.js';
import { waterQuantity } from '../../api/water'

class WaterDeliveryDR extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        img: null,
    }
    this.scan = this.scan.bind(this);
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      this.setState({img: data});
      Scanner.scan(data.uri, 600, 800, 90, 'JPEG', '').then((path) => {console.log("reso");console.warn(path)})
      // scan(data);
    }
  };

  scan = function(data){
    console.log(data);
    Scanner.scan(data.path, 600, 800, 90, 'JPEG', '').then((path) => {console.log("reso");console.warn(path)})
  }
  render() {
    return (
      <View  style={styles.container}>
        <Header header={"Upload Document"} />
        <View style={styles.cameraWrapper}>
        {this.state.img == null?
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera'}
        />
        :
        <Image
          style={{width: 50, height: 50}}
          source={{uri: this.state.img.uri}}
        />}
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
        </View>
      </View>
      </View>
    );
  }
}

const mapStateToProps = function(store) {
    return {
      loading: store.AuthState.loading,
      user: store.AuthState.user,
      water_quantity: store.WaterState.water_quantity,
      waddress_id: store.WaterState.waddress_id,
    };
  };
  
export default connect(mapStateToProps)(WaterDeliveryDR);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  cameraWrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});