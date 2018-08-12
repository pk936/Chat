/**
 * Created by piyush on 7/7/18.
 */
const {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
} = require('./keyMirror').default;
import axios from'axios';
import APP_URL from '../../constants/constants';
import jwtDecode from 'jwt-decode';
import {AsyncStorage} from 'react-native';
// import HeadersBearer from '../../setup/headerBearer';

export function fetchUserRequest(id, token) {

    const HeadersBearer = {'Authorization':'Bearer ' + token}


    let request = axios({
        method:'get',
        url:APP_URL.FETCH_USERS + `/${id}`,
        headers:HeadersBearer
    })

    return {
        type: FETCH_USER_REQUEST,
        payload:request
    }
}

export const fetchUserSuccess = (payload) => {
    // console.log('payload',payload)

    return {
        type: FETCH_USER_SUCCESS,
        payload
    }
}

export const fetchUserFailure = (err) => {
    return {
        type: FETCH_USER_FAILURE,
        payload:err
    }
}