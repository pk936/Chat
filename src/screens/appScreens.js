/**
 * Created by piyush on 7/7/18.
 */
import {createStackNavigator} from 'react-navigation';
import Home from '../components/home/welcomeUser';
import WrapperContainer from '../wrapperContainer';
import BottomTabNavigator from './bottomTabNavigator';
// This contains app screens after user logs in.

const AppScreens = createStackNavigator({
    // WrapperContainer:{screen:WrapperContainer},
    Home: {screen: WrapperContainer},
    Profile:{screen:BottomTabNavigator}
},{
    headerMode:'none',
}
    // {
    // initialRouteName:Home
    // }
);

export default AppScreens;