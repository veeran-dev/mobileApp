import { combineReducers } from 'redux'// Reducers
import CommonReducer from './CommonReducer'
import AuthReducer from './AuthReducer'
import AddressReducer from './AddressReducer'
import WaterReducer from './WaterDeliveryReducer'
// Combine Reducers
export default combineReducers({
    commonState: CommonReducer,
    AuthState: AuthReducer,
    AddressState: AddressReducer,
    WaterState: WaterReducer,
});