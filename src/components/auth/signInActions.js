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
import jwtDecode from 'jwt-decode';
import {AsyncStorage} from 'react-native';

export function signInRequest(credentials) {
    let {username,password} = credentials;

    // AsyncStorage.getItem('username').then(res => {
    //     console.log('RES', res, username);
    // })

    let request = axios({
        method:'post',
        url:APP_URL.LOGIN_URL,
        data:{email:username,password}
    })

    return {
        type: SIGN_IN_REQUEST,
        payload:request
    }
}

export const signInSuccess = (payload) => {
    // console.log('payload',payload)
    let token = payload.token;
    AsyncStorage.setItem('jwt', token);
    let user = jwtDecode(token);
    // console.log('usersssssssssssssssss',user)
    return {
        type: SIGN_IN_SUCCESS,
        payload:user
    }
}

export const signInFailure = (err) => {
    return {
        type: SIGN_IN_FAILURE,
        payload:err
    }
}