/**
 * Created by piyush on 7/5/18.
 */

import React from 'react';
import { Container, Header,List, ListItem,Thumbnail, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {connect} from 'react-redux';

export default class UserList extends React.Component {
    constructor(props){
        super();
    }

    render(){
        let {users} = this.props;

        // if(users){
        //     console.log('Users', users)
        // }

        // console.log('users', users)

        let userList =  users ? users.map(user=>{
            console.log('users', user.name)

            return (

                <ListItem avatar key={user.id}>
                    <Left>
                        <Thumbnail source={{ uri: 'Image URL' }} />
                    </Left>
                    <Body>
                    <Text>{user.attributes.name}</Text>
                    <Text note>{user.relationships.role.data.name}</Text>
                    </Body>
                </ListItem>
            )
        }) : null;

        return (
            <List>{userList}</List>
        )
    }
}