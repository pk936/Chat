/**
 * Created by piyush on 7/10/18.
 */
import  React from 'react';
// import welcomeScreen from "./components/home/welcomeScreen";
import jwtDecode from 'jwt-decode';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

const AuthenticateUser = (props) => {
        AsyncStorage.getItem('jwt').then(token=>{
            let userName = jwtDecode(token).name;
            if(token){
                props.navigation.navigate('WelcomeUser', {
                    userName
                }); //  Or App
            }
        }).catch(err=>{
            props.navigation.navigate('Auth');
        })

    return(<View>
        {/*<StatusBar barStyle="default" />*/}
    </View>)
}

export default AuthenticateUser;