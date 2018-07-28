/**
 * Created by piyush on 7/5/18.
 */

import React from 'react';
import { Container, Header,List, ListItem,Thumbnail, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {connect} from 'react-redux';
const anonymousUser = require('../../../assets/images/default_profile_img.jpeg');

export default class TeamList extends React.Component {
    constructor(props){
        super();
    }

    startConversation = (recipientId,name,image) => {
        this.props.navigation.navigate('ChatWindow', {
            recipientId,name,image
        })
    }

    render(){
        let {teams} = this.props;
        console.log('...', Object.keys(teams.data));
        let teamList =  teams ? teams.data.map(team=>{
            let uri = team.attributes.avatar_thumb ? {uri: team.attributes.avatar_thumb} : anonymousUser;
            return (
                <ListItem avatar key={team.id} onPress={()=>this.startConversation(team.id,team.attributes.name, uri)}>
                    <Left>
                        <Thumbnail small source={uri} />
                    </Left>
                    <Body>
                    <Text style={{fontSize:12}}>{team.attributes.name}</Text>
                    <Text note  style={{fontSize:12}}>{'123'}</Text>
                    </Body>
                </ListItem>
            )
        }) : <Text>Loading</Text>;

        return (
            <List>{teamList}</List>
        )
    }
}