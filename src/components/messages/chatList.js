/**
 * Created by piyush on 7/5/18.
 */

import React from 'react';
import { Container, Header,List, ListItem,Thumbnail, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {connect} from 'react-redux';
import moment from 'moment';
const anonymousUser = require('../../../assets/images/default_profile_img.jpeg');

export default class ChatList extends React.Component {
    constructor(props){
        super();
    }

    chatWithUser(){
        this.props.navigation.navigate('ChatWindow')
    }

    render(){
        let {chatList} = this.props;
        let list = chatList.data.map(chat=> {
            let recipient = chat.attributes.recipient[0];
            let uri = recipient.avatarThumb ? {uri: recipient.avatarThumb} : anonymousUser;
            let lastMsg = chat.attributes.messages[0];

            return <ListItem avatar key={chat.id} onPress={e=>this.chatWithUser(e)}>
                        <Left>
                            <Thumbnail source={uri}/>
                        </Left>
                        <Body>
                            <Text>{recipient.recipientName}</Text>
                            <Text note>{lastMsg.message}</Text>
                        </Body>
                        <Right>
                            <Text>{moment(lastMsg.timestamp).fromNow()}</Text>
                        </Right>
                    </ListItem>
        })

        return <List>{list}</List>;
    }
}

// const mapStateToProps = (state) => {
//     return {
//         Users:state.Users.users
//     }
// }
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//
//     }
// }
//
// export default connect(mapStateToProps,mapDispatchToProps)(ChatList);