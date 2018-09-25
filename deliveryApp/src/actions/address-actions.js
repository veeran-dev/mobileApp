import * as types from '../constant/action-types';

export function waterAddresses(data){
	return {
		type: types.WADDRESS,
		payload: data
	}
}

export function loading(data){
	return {
		type: types.LOADING,
		payload: data
	}
}
