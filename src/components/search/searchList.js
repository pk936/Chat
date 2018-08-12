/**
 * Created by piyush on 7/5/18.
 */

import React from 'react';
import { Container, Header,List, ListItem,Thumbnail, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {connect} from 'react-redux';
const anonymousUser = require('../../../assets/images/default_profile_img.jpeg');

export default class SearchList extends React.Component {
    constructor(props){
        super();
    }

    startConversation = (recipientId,name,image) => {
        this.props.navigation.navigate('ChatWindow', {
            recipientId,name,image
        })
    }

    render(){
        let {search} = this.props;
        console.log('...', Object.keys(search.data));
        let searchList =  search ? search.data.map(search=>{
            let uri = search.attributes.avatar_thumb ? {uri: search.attributes.avatar_thumb} : anonymousUser;
            return (
                <ListItem avatar key={search.id} onPress={()=>this.startConversation(search.id,search.attributes.name, uri)}>
                    <Left>
                        <Thumbnail small source={uri} />
                    </Left>
                    <Body>
                    <Text style={{fontSize:12}}>{search.attributes.name}</Text>
                    <Text note  style={{fontSize:12}}>{'123'}</Text>
                    </Body>
                </ListItem>
            )
        }) : <Text>Loading</Text>;

        return (
            <List>{searchList}</List>
        )
    }
}