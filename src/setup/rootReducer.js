/**
 * Created by piyush on 7/7/18.
 */
import {combineReducers} from 'redux';
import signInReducer from '../components/auth/signInReducer';
const rootReducer = combineReducers({
    signIn:signInReducer
})

export default rootReducer;
/**
 * Created by piyush on 7/8/18.
 */
