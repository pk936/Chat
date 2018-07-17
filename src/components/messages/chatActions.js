/**
 * Created by piyush on 7/7/18.
 */
const {
    FETCH_CHAT_REQUEST,
    FETCH_CHAT_SUCCESS,
    FETCH_CHAT_FAILURE
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
        payload:payload
    }
}

export const fetchChatFailure = (err) => {
    return {
        type: FETCH_CHAT_FAILURE,
        payload:err
    }
}