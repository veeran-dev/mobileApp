import * as types from '../constant/action-types';

const initialState = {
  user: [],
  loading: false,
  login_failed: false,
};

const AuthReducer = function(state = initialState, action) {
  switch(action.type) {
    case types.LOGIN_USER:
    console.log(action.payload)
        return { ...state, user: action.payload }
    case types.LOADING:
    	return { ...state, loading: action.payload}
    case types.LOGIN_FAILED:
      return { ...state, login_failed: action.payload}
    default:
      return state
  }
}

export default AuthReducer;