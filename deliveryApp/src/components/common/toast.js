import React, { Component } from 'react';
import Toast, {DURATION} from 'react-native-easy-toast'

import {
  StyleSheet,
  View,
} from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.refs.toast.show('Sorry, wrong password !!!',DURATION.LENGTH_LONG);
  }

  render() {
    return (
        <View>
            <Toast
                ref="toast"
                style={{backgroundColor:'red'}}
                position='top'
                positionValue={200}
                fadeInDuration={750}
                fadeOutDuration={1000}
                opacity={0.8}
                textStyle={{color:'red'}}
            />
        </View>
    );
    }
}

const styles = StyleSheet.create({
});