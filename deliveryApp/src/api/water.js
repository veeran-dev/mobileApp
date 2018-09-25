import React from 'react'
import axios from 'axios'
import { Actions } from 'react-native-router-flux';
import * as action from '../actions/water-actions'
import store from '../Store'

export function selectAddress(id_addresss, address){
  store.dispatch(action.selectAddress(id_addresss));
  store.dispatch(action.selectAddressDetails(address));
  Actions.waterDetails(); 
}


export function waterQuantity(qty){
  store.dispatch(action.waterQuantity(qty));
  Actions.WaterDocs(); 
}