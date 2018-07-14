/**
 * Created by piyush on 7/5/18.
 */

import React from 'react';
import { Container, Header,List, ListItem,Thumbnail, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

export default class SignInScreen extends React.Component {
    constructor(props){
        super();
    }

    render(){
        return (
            <Container>
                <Header />
                <Content>
                    <List>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail source={{ uri: 'Image URL' }} />
                            </Left>
                            <Body>
                            <Text>Piyush Kumar</Text>
                            <Text note>Doing what you like will always keep you happy . .</Text>
                            </Body>
                            <Right>
                                <Text note>3:43 pm</Text>
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}