import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import colors from '../../assets/styles/colors.js';

type Props = {};
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { pwd: '',showToast: false };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.header}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    justifyContent: 'center',
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 16,
  },
  text: {
    fontSize: 24,
    color: colors.black_dark,
    
  },

});