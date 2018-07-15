/**
 * Created by piyush on 7/15/18.
 */
import AppScreensStack from '../screens/appScreens';
import AuthenticateUserOnAppLoad from '../authenticateUser';
import AuthScreensStack from '../screens/authScreens';
import {createSwitchNavigator} from 'react-navigation';
import WelcomeUser from '../components/home/welcomeUser'

const MainNavigator = createSwitchNavigator({
    AuthenticateUserOnAppLoad,
    WelcomeUser,
    App:AppScreensStack,
    Auth:AuthScreensStack
},
    {
        initialRouteName:'AuthenticateUserOnAppLoad'
    }
)

export default MainNavigator;