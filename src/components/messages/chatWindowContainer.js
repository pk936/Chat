/**
 * Created by piyush on 7/5/18.
 */

import React from 'react';
import { Container, Header,List, ListItem,Thumbnail, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {connect} from 'react-redux';
import moment from 'moment';
const anonymousUser = require('../../../assets/images/default_profile_img.jpeg');

class ChatWindowContainer extends React.Component {
    constructor(props){
        super();
    }

    chatWithUser(){
        this.props.navigation.navigate('ChatWindow')
    }

    render(){
        return <Container>
            <Header/>
            <Content>
                <Text>123</Text>
            </Content>
        </Container>
    }
}

const mapStateToProps = (state) => {
    return {
        ActiveChat:state.Chat.chat
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChatWindowContainer);