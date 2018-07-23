/**
 * Created by piyush on 7/7/18.
 */
const {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE
} = require('./keyMirror').default;
import axios from'axios';
import APP_URL from '../../constants/constants';
import jwtDecode from 'jwt-decode';
import {AsyncStorage} from 'react-native';
// import HeadersBearer from '../../setup/headerBearer';

export function fetchUsersRequest(limit=15,offset=0, token) {

    const HeadersBearer = {'Authorization':'Bearer ' + token}

    let request = axios({
        method:'get',
        url:APP_URL.FETCH_USERS + `?limit=${limit}&offset=${offset}`,
        headers:HeadersBearer
    })

    return {
        type: FETCH_USERS_REQUEST,
        payload:request
    }
}

export const fetchUsersSuccess = (payload) => {
    // console.log('payload',payload)

    return {
        type: FETCH_USERS_SUCCESS,
        payload
    }
}

export const fetchUsersFailure = (err) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload:err
    }
}