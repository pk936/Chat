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
import {GiftedChat} from 'react-native-gifted-chat';
import socket from '../../setup/socket';

export default class ChatWindow extends React.Component {
    constructor(props){
        super();
    }

    sendMessage = (e) => {
        // console.log('Mesage', e[0].text, this.props.recipientId);
        let msg = {
            message:e[0].text,
            recipient:this.props.recipientId
        }

        socket.emit('chats', msg);

        //     [
        //     Object {
        //     "_id": "93a928fb-1fd9-49b5-af6c-3f9b44bf4eca",
        //         "createdAt": 2018-07-21T19:23:01.386Z,
        //         "text": "123",
        //         "user": Object {
        //         "_id": "1509971665850",
        //     },
        // }]

    }

    render(){
        let {data, loggedInUserId, recipientName} = this.props;
        let messages;
        if (data) {

            // console.log('data', data.messages);

            messages = [{
                _id: Math.random(),
                text: `You are now connected with ${recipientName}`,
                createdAt: new Date(),
                system: true
            }, ...data.messages]

            return <GiftedChat messages={messages}
                               user={{_id:loggedInUserId}}
                               onSend={this.sendMessage}
            />;
        }else{
            return <Spinner />
        }

    }
}
