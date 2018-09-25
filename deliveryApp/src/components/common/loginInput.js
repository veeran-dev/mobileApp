import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ToastAndroid,
  Animated,
  Easing
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import colors from '../../assets/styles/colors.js';

type Props = {};
export default class LoginInput extends Component {
  constructor(props) {
    super(props);
    this.state = { pwd: '',showToast: false };

    this.shakeAnimations = new Animated.Value(0);
    this.showErrorAnimation = this.showErrorAnimation.bind(this);
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
        this.setState({pwd: ""});
      }
    })
  }

  showErrorAnimation() {
      this.shakeAnimations.setValue(0);
      Animated.timing(this.shakeAnimations, {
        toValue: 1,
        duration: 500,
      }).start();
    }
  componentWillReceiveProps(nextProps){
    if(nextProps.error == true){
      console.log("skjgskgh");
      this.showErrorAnimation();
        ToastAndroid.showWithGravity(
          'Please enter valid pin',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
    }
  }

  render() {


    const marginLeft = this.shakeAnimations.interpolate({
                inputRange: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 2],
                outputRange: [0, -10, 10, -10, 10, -10, -1]
            });
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
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
        <Animated.View style={[styles.lineContaier,{ marginLeft: marginLeft}]}>
          <View style={styles.line}></View>
          <View style={styles.line}></View>
          <View style={styles.line}></View>
          <View style={styles.line}></View>
        </Animated.View>
      </View>
        {this.props.error == true ?<View style={styles.errorWrapper}>
          <Animated.Text style={[styles.error_text,{ marginLeft: marginLeft}]}>Please enter valid pin number</Animated.Text>
        </View>:null}        
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    marginLeft: 0,
    width: '100%',
    paddingRight: 0,
    alignItems: 'center',
  },
  wrapper:{
    flex:1,
    marginLeft: 0,
    width: '100%',
    paddingRight: 0,
    alignItems: 'center',
    justifyContent:'center',
  },
  input: {
    fontSize: 48,
    color: colors.black_dark,
    letterSpacing: 44,
    borderWidth:0,
    alignItems: 'center',
    justifyContent:'center',
    width: 240,
  },
  lineContaier: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexGrow: 1,
    maxHeight:80,
  },
  line: {
    width:48,
    borderTopColor: colors.black_dark,
    borderTopWidth: 2,
    marginRight: 8,
  },
  errorWrapper:{
    flex:1,
    marginTop: 16,
    marginLeft: 0,
    width: '100%',
    paddingRight: 0,
    alignItems: 'center',
    justifyContent:'center',
  },
  error_text:{
    backgroundColor: '#db3236',
    color: 'white',
    textAlign: 'center',
    borderRadius: 16,
    fontSize: 18,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 16,
    paddingLeft: 16,
  }

});