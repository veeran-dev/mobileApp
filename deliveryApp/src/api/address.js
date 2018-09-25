import React from 'react'
import axios from 'axios'
import { Actions } from 'react-native-router-flux';
import * as action from '../actions/address-actions'
import store from '../Store'

export function getAddresses(id_user){
  console.log("getAddresses");
  store.dispatch(action.loading(true));
  return axios.get('https://www.abcd.online/deler.php?request=2&id_user='+id_user+'')
  .then(response => {
    console.log(response.data);
    store.dispatch(action.waterAddresses(response.data));
    store.dispatch(action.loading(false));
    return response
  })
  .catch(function (error) {
    console.log(error);
  });
}