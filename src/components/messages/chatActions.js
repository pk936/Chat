/**
 * Created by piyush on 7/7/18.
 */
const {
    FETCH_CHAT_REQUEST,
    FETCH_CHAT_SUCCESS,
    FETCH_CHAT_FAILURE,
    FETCH_ALL_CHAT_REQUEST,
    FETCH_ALL_CHAT_SUCCESS,
    FETCH_ALL_CHAT_FAILURE
} = require('./keyMirror').default;
import axios from'axios';
import APP_URL from '../../constants/constants';
import jwtDecode from 'jwt-decode';
import {AsyncStorage} from 'react-native';

export const fetchChatRequest = (id,token) => {

    const HeadersBearer = {'Authorization':'Bearer ' + token}
    let request = axios({
        method:'get',
        url:APP_URL.CHAT_URL + '/' + id,
        headers:HeadersBearer
    })

    return {
        type: FETCH_CHAT_REQUEST,
        payload:request
    }
}

export const fetchChatSuccess = (payload) => {
    // console.log('chat success',payload)
    return {
        type: FETCH_CHAT_SUCCESS,
        payload
    }
}

export const fetchChatFailure = (err) => {
    return {
        type: FETCH_CHAT_FAILURE,
        payload:err
    }
}

export const fetchAllChatRequest = (limit=10,token) => {

    const HeadersBearer = {'Authorization':'Bearer ' + token}
    let request = axios({
        method:'get',
        url:APP_URL.CHAT_URL + '?limit' + limit,
        headers:HeadersBearer
    })

    return {
        type: FETCH_ALL_CHAT_REQUEST,
        payload:request
    }
}

export const fetchAllChatSuccess = (payload) => {
    // console.log('chat success',payload)
    return {
        type: FETCH_ALL_CHAT_SUCCESS,
        payload
    }
}

export const fetchAllChatFailure = (err) => {
    return {
        type: FETCH_ALL_CHAT_FAILURE,
        payload:err
    }
}