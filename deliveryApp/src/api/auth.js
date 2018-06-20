import React from 'react'
import axios from 'axios'
import { Actions } from 'react-native-router-flux';
import * as action from '../actions/auth-actions'
import store from '../Store'

export function verifyLogin(pwd){
  console.log("verifyLogin");
  return axios.get('https://www.kobster.online/deliveryHandler.php?request=1&password='+pwd+'')
  .then(response => {
    console.log(response.data);
    store.dispatch(action.loginUser(response.data));
    if(response.data['id_user'] != 0){
      Actions.dash(); 
    }
    return response
  })
  .catch(function (error) {
    console.log(error);
  });
}