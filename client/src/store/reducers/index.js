import { combineReducers } from 'redux';
import AuthReducer from './authReducer';

const RootReducer = combineReducers({
    AuthReducer,
});

export default RootReducer;