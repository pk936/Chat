/**
 * Created by piyush on 7/7/18.
 */
import {combineReducers} from 'redux';
import SignInReducer from '../components/auth/signInReducer';

const rootReducer = combineReducers({
    ActiveUser:SignInReducer
})

export default rootReducer;
/**
 * Created by piyush on 7/8/18.
 */
