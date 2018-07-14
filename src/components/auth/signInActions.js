/**
 * Created by piyush on 7/7/18.
 */
const {
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE
} = require('./keyMirror').default;
import axios from'axios';
import APP_URL from '../../constants/constants';

export function signInRequest(credentials) {
    let {username,password} = credentials;

    // AsyncStorage.getItem('username').then(res => {
    //     console.log('RES', res, username);
    // })

    console.log('credentials 2', credentials)

    return {
        type: SIGN_IN_REQUEST,
        payload:{
            data:credentials,
            error:'',
            message:''
        }
    }
}

export const signInSuccess = () => {
    return {
        type: SIGN_IN_REQUEST,
        payload:{
            error:null,
            message:'LOGGED IN'
        }
    }
}

export const signInFailure = () => {
    return {
        type: SIGN_IN_REQUEST,
        payload:{
            error:true,
            message:'SOME PRBLOM HERE'
        }
    }
}