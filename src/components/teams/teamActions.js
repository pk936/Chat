/**
 * Created by piyush on 7/7/18.
 */
const {
    FETCH_TEAMS_REQUEST,
    FETCH_TEAMS_SUCCESS,
    FETCH_TEAMS_FAILURE
} = require('./keyMirror').default;
import axios from'axios';
import APP_URL from '../../constants/constants';
import jwtDecode from 'jwt-decode';
import {AsyncStorage} from 'react-native';
// import HeadersBearer from '../../setup/headerBearer';

export function fetchTeamsRequest(limit=15,offset=0, token) {

    const HeadersBearer = {'Authorization':'Bearer ' + token}

    let request = axios({
        method:'get',
        url:APP_URL.FETCH_TEAMS + `?limit=${limit}&offset=${offset}`,
        headers:HeadersBearer
    })

    return {
        type: FETCH_TEAMS_REQUEST,
        payload:request
    }
}

export const fetchTeamsSuccess = (payload) => {
    // console.log('payload',payload)

    return {
        type: FETCH_TEAMS_SUCCESS,
        payload
    }
}

export const fetchTeamsFailure = (err) => {
    return {
        type: FETCH_TEAMS_FAILURE,
        payload:err
    }
}