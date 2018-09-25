import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard,
  Button
} from 'react-native';
import LocationSwitch from 'react-native-location-switch';
import Header from '../common/Header'
import colors from '../../assets/styles/colors.js';
import LinearGradient from 'react-native-linear-gradient';
import { waterQuantity } from '../../api/water'

export default class WaterDeliveryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      delivered_can: null,
      empty_can: null
    }
  }
  submitWaterDetails(){
    console.log("submitWaterDetails");
    if(this.state.delivered_can > 0 && this.state.empty_can > 0){
      $data = [this.state.delivered_can,this.state.empty_can];
      waterQuantity($data);
    }
    else{
      alert("fail");
    }
  }

  render() {
    return (
      <View  style={styles.container}>
        <Header header={"Enter Quantity"} />
        <View style={styles.menuContainer}>          
          <LinearGradient 
             colors={['#075dff', '#22a5ff']}
             style = { styles.menu }>
            <View style={styles.imageWrapper}>
              <Image source={require('../../assets/img/wc1.png')} style={styles.img} />
            </View>
            <View style={styles.quantityWrapper}>
              <Text style={styles.label}>Delivered Can</Text>
              <TextInput 
                clearTextOnFocus={true}
                keyboardType = 'numeric'
                ref={(c) => this._input_dc = c}
                onBlur={(e)=>{this._input_ec.focus()}}
                onChangeText = {(delivered_can)=> this.setState({delivered_can})}
                style={styles.input} />
            </View>
          </LinearGradient>
          <LinearGradient 
             colors={['#075dff', '#22a5ff']}
             style = { styles.menu }>
          <View style={styles.imageWrapper}>
            <Image source={require('../../assets/img/wc2.png')} />
          </View>
          <View style={styles.quantityWrapper}>
            <Text style={styles.label}>Empty Can</Text>
            <TextInput 
              clearTextOnFocus={true}
              ref={(c) => this._input_ec = c}
              keyboardType = 'numeric'
              onChangeText = {(empty_can)=> this.setState({empty_can})}
              style={styles.input} />
          </View>
          </LinearGradient>
        </View>
        <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btnWrapper} onPress={this.submitWaterDetails.bind(this)}>
              <Text style={styles.btnText}>Next</Text>
            </TouchableOpacity>
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
  btn: {
    minHeight: 24,
  },
  btnContainer:{
    padding:8,
  },
  menuContainer: {
    padding: 16,
    flex: 4,
    flexDirection: 'column',
  },
  menu: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 16,
    maxHeight: 180,
    borderRadius: 4,
  },
  imageWrapper: {
    flex:1,
    alignItems: 'center',
    justifyContent : 'center',
    maxHeight: 280,
  },
  quantityWrapper:{
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent : 'center',
    maxHeight: 280,
  },
  label: {
    color: colors.white_light,
    fontSize: 18,
  },
  input: {
    fontSize: 48,
    minWidth: 100,
    color: colors.white_light,
    letterSpacing: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.white_light,
  },
  btnWrapper:{
    height: 50,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#841584',
  },
  btnText:{
    color: '#fdfdfd',
    textAlign: 'center',
    fontSize: 20,
  }
});