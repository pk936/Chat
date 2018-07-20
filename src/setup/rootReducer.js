/**
 * Created by piyush on 7/7/18.
 */
import {combineReducers} from 'redux';
import SignInReducer from '../components/auth/signInReducer';
import UserReducer from '../components/users/userReducer';
import ChatReducer from '../components/messages/chatReducer';

const rootReducer = combineReducers({
    ActiveUser:SignInReducer,
    Users:UserReducer,
    Chat:ChatReducer
})

export default rootReducer;
/**
 * Created by piyush on 7/8/18.
 */
