import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  BackHandler,
  Alert 
} from 'react-native';

import LocationSwitch from 'react-native-location-switch';
import Header from '../common/Header'
import colors from '../../assets/styles/colors.js';
import LinearGradient from 'react-native-linear-gradient';
// import {createStackNavigator} from 'react-navigation';
import { StackActions, NavigationActions } from 'react-navigation';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    var today = new Date(),
    date = today.getFullYear();
    date = date + (today.getMonth()+1 < 10 ? '-0' + (today.getMonth() + 1) : '-' + today.getMonth())
    date = date + (today.getDate()+1 < 10 ? '-0' + (today.getDate() + 1) : '-' + today.getDate())
    Keyboard.dismiss();
    this.state = { 
      date: date,
      locationEnabled: false
    };
    this.onEnableLocationPress = this.onEnableLocationPress.bind(this);
    this.handleBackDashButtonClick = this.handleBackDashButtonClick.bind(this);
  }
  onPress = () => {
    console.log("onPress");
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackDashButtonClick);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackDashButtonClick);
  }

  componentDidMount() {
    LocationSwitch.isLocationEnabled(
      () => {
        // Alert.alert('Location is enabled');
        this.setState({ locationEnabled: true });
      },
      () => { 
        this.onEnableLocationPress()
      },
    );
  }

  handleBackDashButtonClick() {
      Alert.alert(
       'Exit App',
       'Exiting the application?', [{
           text: 'Cancel',
           onPress: function(){console.log('Cancel Pressed')},
           style: 'cancel'
       }, {
           text: 'OK',
           onPress: function(){BackHandler.exitApp()},
       }, ], {
           cancelable: false
       }
    )
    return true;
  }
  onEnableLocationPress() {
    LocationSwitch.enableLocationService(1000, true,
      () => { this.setState({ locationEnabled: true }); },
      () => { this.setState({ locationEnabled: false }); },
    );
  }

  renderLocationStatus() {
    if (this.state.locationEnabled) {
      return <Text style={styles.textSuccess} >Location enabled</Text>;
    }
    return <Text style={styles.text}>Location disabled</Text>;
  }

  toAddress(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackDashButtonClick);
    this.props.navigation.navigate('address');
  }

  render() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'dash' })],
    });
    this.props.navigation.dispatch(resetAction);
    return (
      <View  style={styles.container}>
        <Header header={"Dashboard"} />
        <View style={styles.menuContainer}>          
          <LinearGradient 
             colors={['#22a5ff', '#075dff']}
             style = { styles.menu }>
             <TouchableOpacity onPress={this.toAddress.bind(this)}>
            <Text style={[styles.name, styles.active]}>Water Delivery</Text>
            <Text style={[styles.hint, styles.active]}>{this.state.date}</Text>
            </TouchableOpacity>
          </LinearGradient>          
          <LinearGradient 
             colors={['#d8d8d8', '#bdbfc1']}
             style = { styles.menu }>
            <Text style={styles.name}>Delivery Receipt</Text>
            <Text style={styles.hint}>Coming Soon</Text>
          </LinearGradient>
          <LinearGradient 
             colors={['#d8d8d8', '#bdbfc1']}
             style = { styles.menu }>
            <Text style={styles.name}>Invoice Copy</Text>
            <Text style={styles.hint}>Coming Soon</Text>
          </LinearGradient>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
  },
  active: {
    color: colors.white_light,
  },
  menuContainer: {
    padding: 16,
    flex: 1,
    flexDirection: 'column',
  },
  menu: {
    flex: 1,
    maxHeight: 160,
    marginBottom: 16,
    justifyContent : 'center',
    padding: 24,
    borderRadius: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  gpscontainer: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 20,
  },
  text: {
    fontSize: 20,
  },
  textSuccess: {
    fontSize: 20,
    color: 'green',
  },
});