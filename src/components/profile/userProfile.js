/**
 * Created by piyush on 7/5/18.
 */

import React from 'react';
import { Container, Header,List, ListItem,Thumbnail, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {connect} from 'react-redux';

class userProfile extends React.Component {
    constructor(props){
        super();
    }

    render(){
        if(this.props.Users){
            console.log('Users', this.props.Users.data)
        }
        return (

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

        )
    }
}

const mapStateToProps = (state) => {
    return {
        Users:state.Users.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(userProfile);