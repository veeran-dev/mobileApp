import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import Header from '../common/Header'
import colors from '../../assets/styles/colors.js';
import LinearGradient from 'react-native-linear-gradient';
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }
  onPress = () => {
    console.log("onPress");
  }
  render() {
    return (
      <View  style={styles.container}>
        <Header header={"Dashboard"} />
        <View style={styles.menuContainer}>          
          <LinearGradient 
             colors={['#22a5ff', '#075dff']}
             style = { styles.menu }>
             <TouchableOpacity onPress={this.onPress}>
            <Text style={[styles.name, styles.active]}>Water Delivery</Text>
            <Text style={[styles.hint, styles.active]}>Coming Soon</Text>
            </TouchableOpacity>
          </LinearGradient>          
          <LinearGradient 
             colors={['#d8d8d8', '#bdbfc1']}
             style = { styles.menu }>
            <Text style={styles.name}>Water Delivery</Text>
            <Text style={styles.hint}>Coming Soon</Text>
          </LinearGradient>
          <LinearGradient 
             colors={['#d8d8d8', '#bdbfc1']}
             style = { styles.menu }>
            <Text style={styles.name}>Water Delivery</Text>
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
  }
});