import {combineReducers} from 'redux';

import loginReducer from './login';


/**
 * 每个业务对应一个reducers
 */
export default combineReducers({
    // userStore: userReducer,
    loginReducer
});

