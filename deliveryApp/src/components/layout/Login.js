import React, { Component } from 'react';
import { connect } from 'react-redux'
import LoginInput from '.././common/loginInput'
import {
  StyleSheet,
  View,
  Image,
  Keyboard,
  ActivityIndicator,
  Dimensions,
  Alert,
  NetInfo,
  PermissionsAndroid 
} from 'react-native';
import {verifyLogin} from '../../api/auth'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      pwd: '',
      wrongCode: false,
      dataEnabled: true,
    };
    this.handleFirstConnectivityChange = this.handleFirstConnectivityChange.bind(this);
  }

  login(pwd){
    if(this.state.dataEnabled == false){
      Alert.alert("Please enable data for better performance");
      return false;
    }
    verifyLogin(pwd);
    Keyboard.dismiss();
  }

  watchID = null;
  componentWillMount(){

  NetInfo.getConnectionInfo().then((connectionInfo) => {
    console.log("open");
    console.log(connectionInfo);
    if(connectionInfo.type == "none"){
      Alert.alert("Please enable data for better performance");
      this.setState({dataEnabled : false});
    }
    else{
      this.setState({dataEnabled : true}); 
    }
  });

  NetInfo.addEventListener('connectionChange',this.handleFirstConnectivityChange);

  try {
    const granted = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Location permission access',
        'message': 'For better performance please allow as to access your location'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("location access allowed");
    } else {
      console.log("location permission denied")
    }
  } 
  catch (err) {
    console.warn(err)
  }
    
  }

  handleFirstConnectivityChange(connectionInfo) {
    console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    if(connectionInfo.type == "none"){
      Alert.alert("Please enable data for better performance");
      this.setState({dataEnabled : false});
    }
    else{
      this.setState({dataEnabled : true}); 
    }
  }
  render() {
          return (
            <View  style={styles.container}>
              <View style={styles.logo}>
                <Image source={require('../../assets/img/logo.png')} />
              </View>
              <View style={styles.login}>
                <LoginInput done={(pwd)=>this.login(pwd)} error={this.props.loginFailed} />
                {this.props.loading == true ?
                  <View  style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0110ff" />
                  </View>:null}
              </View>    
            </View>
          );      

  }
}

const mapStateToProps = function(store) {
    console.log(store.AuthState);
    return {
      loading: store.AuthState.loading,
      loginFailed: store.AuthState.login_failed,
    };
  };
  
export default connect(mapStateToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
  },
  logo: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    margin: 8,
  },
  login: {
    flex: 1,
    justifyContent:'center',
    margin: 8,
  },
  loadingContainer: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0, 
    left: 0, 
    right: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});