import * as types from '../constant/action-types';

export function loginUser(data){
	return {
		type: types.LOGIN_USER,
		payload: data
	}
}

export function loading(data){
	return {
		type: types.LOADING,
		payload: data
	}
}

export function loginFailed(data){
	return {
		type: types.LOGIN_FAILED,
		payload: data
	}
}
