/**
 * Created by piyush on 7/16/18.
 */

import {createBottomTabNavigator} from 'react-navigation';
import ProfileContainer from '../components/profile/profileContainer';

const BottomTabNavigator = createBottomTabNavigator({
    Profile:ProfileContainer // Profile Stack should be here,
    // Settings:SettingsContainer
});

export default BottomTabNavigator;