/**
 * Created by piyush on 7/10/18.
 */
import  React from 'react';
// import welcomeScreen from "./components/home/welcomeScreen";
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

const AuthenticateUser = (props) => {
        let token = AsyncStorage.getItem('jwt').then(token=>{
            console.log('token',token);

            if(token){
                props.navigation.navigate('WelcomeUser'); //  Or App
            }
        }).catch(err=>{
            props.navigation.navigate('Auth');
        })

    return(<View>
        <StatusBar barStyle="default" />
    </View>)
}

export default AuthenticateUser;