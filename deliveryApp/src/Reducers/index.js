import { combineReducers } from 'redux'// Reducers
import CommonReducer from './CommonReducer'

// Combine Reducers
export default combineReducers({
    commonState: CommonReducer,
});