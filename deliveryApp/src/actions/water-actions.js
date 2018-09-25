import * as types from '../constant/action-types';

export function selectAddress(data){
	return {
		type: types.WADDRESS_ID,
		payload: data
	}	
}

export function selectAddressDetails(data){
	return {
		type: types.WADDRESS_DETAILS,
		payload: data
	}	
}

export function waterQuantity(data){
	return {
		type: types.WATER_QUANTITY,
		payload: data
	}	
}