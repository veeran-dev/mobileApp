import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Animated,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import colors from '../../assets/styles/colors.js';

type Props = {};
export default class LoginInput extends Component {
  constructor(props) {
    super(props);
    this.state = { pwd: '',showToast: false };
  }
  onChange(text) {
    let newText = '';
    let numbers = '0123456789';
    
    for (var i = 0; i < text.length; i++) {
        if ( numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
    }   
    this.setState({pwd: newText, showToast: true},function(){
      if(this.state.pwd.length == 4){
        
        this.props.done(this.state.pwd);
      }
    })
}
  componentWillReceiveProps(newText){
    console.log(newText);
  }

  render() {
      
      const error =this.props.error == true ?
                  <Animated.View style={[styles.errorLayer, {opacity: this.animateValue}]}>
                    <View style={styles.arrow}></View>
                    <View style={styles.errorContainer}>
                      <View style={styles.error}>
                        <Text style={styles.errorText}>I am success.. touch me..</Text>
                      </View>
                    </View>
                  </Animated.View>
                    : null;
    return (
      <View style={styles.container}>
        
        <TextInput 
          style={styles.input} 
          underlineColorAndroid={"transparent"} 
          onChangeText = {(pwd)=> this.onChange(pwd)}
          value={this.state.pwd}
          maxLength = {4}
          clearTextOnFocus={true}
          keyboardType = 'numeric'
          secureTextEntry={true}
          />
        <View style={styles.lineContaier}>
          <View style={styles.line}></View>
          <View style={styles.line}></View>
          <View style={styles.line}></View>
          <View style={styles.line}></View>
        </View>
        {error}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    width: 208,
    flex: 2,
  },
  input: {
    fontSize: 48,
    color: colors.black_dark,
    letterSpacing: 44,
    borderWidth:0,
  },
  lineContaier: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  line: {
    width:48,
    borderTopColor: colors.black_dark,
    borderTopWidth: 2,
    marginRight: 8,
  },
  errorLayer: {
    opacity: 0.5,
  },
  arrow: {
    alignItems: 'baseline',
    height: 12,
    width: 12,
    position: 'absolute',
    left: 16,
    top: 10,
    borderLeftWidth: 1,
    borderRightWidth: 0,
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderColor: colors.red,
    backgroundColor: colors.white,
    zIndex: 1000,
    transform: [{ rotate: '45deg'}],
  },
  errorContainer: {
      minHeight: 40,
      marginTop: 16,
      alignItems: 'center',
      borderWidth:1,
      borderColor: colors.red,
  },
  error: {
      padding: 10,
  }

});