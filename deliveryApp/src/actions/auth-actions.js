import * as types from '../constant/action-types';

export function loginUser(data){
	return {
		type: types.LOGIN_USER,
		payload: data
	}
}
