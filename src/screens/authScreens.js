/**
 * Created by piyush on 7/7/18.
 */
import {createStackNavigator} from 'react-navigation';
import SignInContainer from '../components/auth/signInContainer';

// used for signin, register, forgot password

const AuthScreen = createStackNavigator({
    SignInContainer: {screen: SignInContainer}
},{
    headerMode:'none',
});

export default AuthScreen;