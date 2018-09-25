import * as types from '../constant/action-types';

const initialState = {
  waddress: [],
  waddress_id: null,
  loading: false,
};

const AddressReducer = function(state = initialState, action) {
  switch(action.type) {
    case types.WADDRESS:
        return { ...state, waddress: action.payload }
    case types.WADDRESS_ID:
        return { ...state, waddress_id: action.payload }
    case types.LOADING:
    	return { ...state, loading: action.payload}
    default:
      return state
  }
}

export default AddressReducer;