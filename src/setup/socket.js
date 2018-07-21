/**
 * Created by piyush on 7/21/18.
 */
import io from 'socket.io-client/dist/socket.io';
import APP_URL from '../constants/constants';
import {AsyncStorage} from 'react-native';

window.navigator.navigate = 'react-native';

const socket = io(APP_URL.SOCKET_URL, {
    transport:['websocket'], //// you need to explicitly tell it to use websockets
    // pingTimeout:10000
})

socket.on('connect', ()=>{
    console.log('SOCKET CONNECTED !');
    AsyncStorage.getItem('jwt').then(tkn=>{
        if(tkn){
            socket
                .emit('authenticate', {
                token:tkn
            })
                .on('authenticated', () => {
                console.log('User authenticated !')
            })
        }
    })
})

export default socket;

// TTo hide yellow warning for following :

console.ignoredYellowBox = ['Setting a timer'];

// Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness
// issue on Android as it keeps the timer module awake, and timers can only be called when the app
// is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info.
//     (Saw setTimeout with duration 85000ms)

// Explanation:  React Native for Android doesn't handle timeouts exceeding one minute.

// Solution:  set the ping timeout server side not client side and it should be fixed
//  io = require('socket.io')(server, {pingTimeout: 30000,pingInterval: 30000}),
// Then restart the server

// You can also use
// import ignoreWarnings from 'react-native-ignore-warnings';
// ignoreWarnings('Setting a timer');