/**
 * Created by piyush on 7/7/18.
 */
import {combineReducers} from 'redux';
import SignInReducer from '../components/auth/signInReducer';
import UserReducer from '../components/users/userReducer';

const rootReducer = combineReducers({
    ActiveUser:SignInReducer,
    Users:UserReducer
})

export default rootReducer;
/**
 * Created by piyush on 7/8/18.
 */
