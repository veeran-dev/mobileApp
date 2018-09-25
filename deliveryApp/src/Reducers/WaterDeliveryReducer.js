import * as types from '../constant/action-types';

const initialState = {
  company_name: null,
  waddress_id: null,
  waddress_details: null,
  water_quantity: null,
  loading: false,
};

const AddressReducer = function(state = initialState, action) {
  switch(action.type) {
    case types.WATER_QUANTITY:
        return { ...state, water_quantity: action.payload }
    case types.WADDRESS_DETAILS:
        return { ...state, waddress_details: action.payload }
    case types.WADDRESS_ID:
        return { ...state, waddress_id: action.payload }
    case types.LOADING:
    	return { ...state, loading: action.payload}
    default:
      return state
  }
}

export default AddressReducer;