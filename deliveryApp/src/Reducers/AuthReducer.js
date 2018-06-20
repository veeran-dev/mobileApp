import * as types from '../constant/action-types';

const initialState = {
  user: [],
};

export default function(state = initialState, action){
  switch(action.type) {
    case types.LOGIN_USER:
		console.log(action.payload);
        return { ...state, user: action.payload }
    default:
      return state
};