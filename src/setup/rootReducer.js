/**
 * Created by piyush on 7/7/18.
 */
import {combineReducers} from 'redux';
import SignInReducer from '../components/auth/signInReducer';
import ProfileReducer from '../components/profile/profileReducer';
import UserReducer from '../components/users/userReducer';
import TeamReducer from '../components/teams/teamReducer';
import SearchReducer from '../components/search/searchReducer';
import ChatReducer from '../components/messages/chatReducer';

const rootReducer = combineReducers({
    LoggedInUser:SignInReducer,
    ActiveUser:ProfileReducer,
    Users:UserReducer,
    Teams:TeamReducer,
    Search:SearchReducer,
    Chat:ChatReducer,
})

export default rootReducer;
/**
 * Created by piyush on 7/8/18.
 */
