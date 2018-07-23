/**
 * Created by piyush on 7/5/18.
 */

import React from 'react';
import { Container, Header,List, ListItem,Thumbnail, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {connect} from 'react-redux';
const anonymousUser = require('../../../assets/images/default_profile_img.jpeg');

export default class UserList extends React.Component {
    constructor(props){
        super();
    }

    startConversation = (recipientId,name,image) => {
        this.props.navigation.navigate('ChatWindow', {
            recipientId,name,image
        })
    }

    render(){
        let {users} = this.props;
        let userList =  users ? users.map(user=>{
            let uri = user.attributes.avatar_thumb ? {uri: user.attributes.avatar_thumb} : anonymousUser;
            return (
                <ListItem avatar key={user.id} onPress={()=>this.startConversation(user.id,user.attributes.name, uri)}>
                    <Left>
                        <Thumbnail source={uri} />
                    </Left>
                    <Body>
                    <Text>{user.attributes.name}</Text>
                    <Text note>{user.relationships.role.data.name}</Text>
                    </Body>
                </ListItem>
            )
        }) : <Text>Loading</Text>;

        return (
            <List>{userList}</List>
        )
    }
}