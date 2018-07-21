/**
 * Created by piyush on 7/5/18.
 */

import React from 'react';
import {
    Container,
    Header,
    List,
    Grid,
    Col,
    Spinner,
    ListItem,
    Thumbnail,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Text
} from 'native-base';
import {connect} from 'react-redux';
import {AsyncStorage} from 'react-native';
import moment from 'moment';
import {GiftedChat} from 'react-native-gifted-chat';
import {fetchChatRequest, fetchChatSuccess, fetchChatFailure} from '../messages/chatActions';
import jwtDecode from'jwt-decode';
import socket from '../../setup/socket';

export default class ChatWindow extends React.Component {
    constructor(props){
        super();
    }

    sendMessage(e){
        console.log('Mesage', e);
        let msg = {
            message:'Hello',
            recipient:this.props.recipientId
        }
        socket.emit('chat', msg)
    }

    render(){
        let {messages, loggedInUserId} = this.props;
        return <GiftedChat messages={messages}
                           user={{_id:loggedInUserId}}
                           onSend={this.sendMessage}
        />;
    }
}
