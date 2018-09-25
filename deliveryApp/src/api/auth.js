import React from 'react'
import axios from 'axios'
import { Actions } from 'react-native-router-flux';
import * as action from '../actions/auth-actions'
import store from '../Store'

export function verifyLogin(pwd){
  console.log("verifyLogin");
  store.dispatch(action.loading(true));
  store.dispatch(action.loginFailed(false));
  return axios.get('https://www.kobster.online/deliveryHandler.php?request=1&password='+pwd+'')
  .then(response => {
    console.log(response.data);
    store.dispatch(action.loading(false));
    console.log(response.data['id_user']);
    console.log(response.data['id_user']!=0);
    if(response.data['id_user'] != undefined && response.data['id_user'] != 0){
      store.dispatch(action.loginUser(response.data));
      Actions.dash(); 
    }
    else{
      store.dispatch(action.loginFailed(true));
    }
    return response
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function toDashboard(){
  Actions.dash();
}