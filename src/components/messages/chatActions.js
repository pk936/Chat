/**
 * Created by piyush on 7/7/18.
 */
const {
    FETCH_CHAT_REQUEST,
    FETCH_CHAT_SUCCESS,
    FETCH_CHAT_FAILURE,
    APPEND_CHAT_REQUEST,
    APPEND_CHAT_SUCCESS,
    APPEND_CHAT_FAILURE,
    RESET_CHAT,
    FETCH_ALL_CHAT_REQUEST,
    FETCH_ALL_CHAT_SUCCESS,
    FETCH_ALL_CHAT_FAILURE,
    UPDATE_ALL_CHAT_SUCCESS
} = require('./keyMirror').default;
import axios from'axios';
import APP_URL from '../../constants/constants';
import jwtDecode from 'jwt-decode';
import {AsyncStorage} from 'react-native';
const anonymousUser = require('../../../assets/images/default_profile_img.jpeg');

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
    // console.log('chat success',payload);

    /// converting data as gifted chat requires
    // let message = payload.attributes.messages;
    // let recipient = payload.attributes.recipient[0];
    let data = payload.attributes.messages.map(msg=>{
        return {
            _id: msg.timestamp,
            text: msg.message,
            createdAt: msg.timestamp,
            user: {
                _id: msg.author,
                name: 'Sameer',
                avatar: anonymousUser,
            },
        }
    })

    return {
        type: FETCH_CHAT_SUCCESS,
        payload:{
            messages:data
        }
    }
}

export const fetchChatFailure = (err) => {
    return {
        type: FETCH_CHAT_FAILURE,
        payload:err
    }
}

export const appendChatSuccess = (payload) => {
    return {
        type: APPEND_CHAT_SUCCESS,
        payload
    }
}

export const resetActiveChat = (payload) => {
    return {
        type: RESET_CHAT,
        payload
    }
}

export const updateAllChatSuccess = (payload) => {
    return {
        type: UPDATE_ALL_CHAT_SUCCESS,
        payload
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