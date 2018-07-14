/**
 * Created by piyush on 7/7/18.
 */
import {createStackNavigator} from 'react-navigation';
import SignInContainer from '../components/auth/signInContainer';
import Home from '../components/home/home';
import WrapperContainer from '../wrapperContainer';

const Stack = createStackNavigator({
    // WrapperContainer:{screen:WrapperContainer},
    SignInContainer: {screen: SignInContainer},
    Home: {screen: Home}
})

export default Stack;