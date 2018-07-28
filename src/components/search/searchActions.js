/**
 * Created by piyush on 7/7/18.
 */
const {
    FETCH_SEARCH_REQUEST,
    FETCH_SEARCH_SUCCESS,
    FETCH_SEARCH_FAILURE
} = require('./keyMirror').default;
import axios from'axios';
import APP_URL from '../../constants/constants';
import jwtDecode from 'jwt-decode';
import {AsyncStorage} from 'react-native';
// import HeadersBearer from '../../setup/headerBearer';

export function fetchSearchRequest(limit=15,offset=0, token) {

    const HeadersBearer = {'Authorization':'Bearer ' + token}

    let request = axios({
        method:'get',
        url:APP_URL.FETCH_SEARCH + `?limit=${limit}&offset=${offset}`,
        headers:HeadersBearer
    })

    return {
        type: FETCH_SEARCH_REQUEST,
        payload:request
    }
}

export const fetchSearchSuccess = (payload) => {
    // console.log('payload',payload)

    return {
        type: FETCH_SEARCH_SUCCESS,
        payload
    }
}

export const fetchSearchFailure = (err) => {
    return {
        type: FETCH_SEARCH_FAILURE,
        payload:err
    }
}