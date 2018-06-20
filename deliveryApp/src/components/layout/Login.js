import React, { Component } from 'react';
import LoginInput from '.././common/loginInput'
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import {verifyLogin} from '../../api/auth'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      pwd: '',
      wrongCode: false,
    };
  }

  login(pwd){
    if(pwd != "1234"){
      this.setState({wrongCode: true},function() {
        console.log(this.state);
        verifyLogin(pwd);
      })
    }
  }

  render() {
    return (
      <View  style={styles.container}>
        <View style={styles.shade}>
        </View>
        <View style={styles.logo}>
          <Image source={require('../../assets/img/logo.png')} />
        </View>
        <View style={styles.login}>
          <LoginInput done={(pwd)=>this.login(pwd)} error={this.state.wrongCode} />
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
  shade: {
    flex: 1,
    backgroundColor: '#cdcdcd',
  },
  logo: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    margin: 8,
  },
  login: {
    flex: 2,
    alignItems:'center',
    justifyContent:'center',
  }
});