/**
 * Created by piyush on 7/7/18.
 */
import {createStackNavigator} from 'react-navigation';
import Home from '../components/home/welcomeUser';
import ChatWindowContainer from '../components/messages/chatWindowContainer';
import WrapperContainer from '../wrapperContainer';
import BottomTabNavigator from './bottomTabNavigator';
// This contains app screens after user logs in.
import React from 'react';
import {Button} from 'react-native';
const AppScreens = createStackNavigator({
    // WrapperContainer:{screen:WrapperContainer},
    Home: {screen: WrapperContainer},
    // Profile:{screen:BottomTabNavigator},
    ChatWindow:{screen:ChatWindowContainer}
},{
    headerMode:'none',
}
    // {
    // initialRouteName:Home
    // }
);

export default AppScreens;