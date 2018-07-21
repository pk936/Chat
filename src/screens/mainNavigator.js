/**
 * Created by piyush on 7/15/18.
 */
import AppScreensStack from '../screens/appScreens';
import AuthenticateUserOnAppLoad from '../authenticateUser';
import AuthScreensStack from '../screens/authScreens';
import {createSwitchNavigator} from 'react-navigation';
import WelcomeUser from '../components/home/welcomeUser'

// createSwitchNavigator does not show back button

const MainNavigator = createSwitchNavigator({
    AuthenticateUserOnAppLoad, // check if user is already authenticated
    WelcomeUser, // if yes, welcome user
    App:AppScreensStack, // show message list as default page in the app
    Auth:AuthScreensStack // Else show login screen
},
    {
        initialRouteName:'AuthenticateUserOnAppLoad',
    },
)

export default MainNavigator;