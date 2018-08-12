/**
 * Created by piyush on 7/5/18.
 */
import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet,View, Image, AsyncStorage} from 'react-native';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Container,Toast, Thumbnail,Header,Body,Content,Title,Left,H3,
    Form, Item,Input, Label, Button,Text, Icon,
    CardItem,Card,Right

} from 'native-base';
import {fetchUserRequest,fetchUserSuccess,fetchUserFailure} from './profileActions';
import UserList from './userProfile';
import jwtDecode from 'jwt-decode';
const anonymousUser = require('../../../assets/images/default_profile_img.jpeg');

export default class UserProfile extends React.Component {
    constructor(props){
        super();
    }

    render(){
        let {activeUser} = this.props;
        let user = null,userInfo,name,image,role,email, phone,teams=[];
        if(activeUser) {
            user = activeUser.data;
            userInfo = user.attributes;
            name = userInfo.name;
            role = user.relationships.role.data.name;
            image = userInfo.avatar_thumb ? {uri: userInfo.avatar_thumb} : anonymousUser;
            email = userInfo.email ? userInfo.email : '-';
            phone = userInfo.phone ? userInfo.phone : '-';
            teams = user.relationships.teams.data.length > 0 ? user.relationships.teams.data.map(t=>t.name).join() : 'All Teams';
        }

        return (
                <Grid>
                    <Row size={2}>
                        <View style={{flex:1,backgroundColor:'#556edf',alignItems:'center',justifyContent:'center'}}>
                            <Thumbnail large source={image}/>
                            <H3 style={{color:'#fff',paddingTop:20}}>{name}</H3>
                            <Text style={{color:'#fff',padding:5, fontSize:14}}>{role}</Text>
                        </View>
                    </Row>
                    <Row size={3}>
                        <View style={{flex:1,justifyContent:'center'}}>
                            <Card transparent>
                                <CardItem>
                                    <Icon active name="mail" />
                                    <Text>{email}</Text>
                                    <Right>
                                        <Icon name="arrow-forward" />
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Icon active name="ios-call" />
                                    <Text>{phone}</Text>
                                    <Right>
                                        <Icon name="arrow-forward" />
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Icon active name="ios-people" />
                                    <Text>{teams}</Text>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Button transparent onPress={e=>this.logOut(e)}>
                                            <Icon active name="log-out" />
                                            <Text>Logout</Text>
                                        </Button>
                                    </Left>
                                    <Body>
                                    {/*<Button transparent>*/}
                                    {/*<Icon active name="chatbubbles" />*/}
                                    {/*<Text>4 Comments</Text>*/}
                                    {/*</Button>*/}
                                    </Body>
                                </CardItem>
                            </Card>
                        </View>
                    </Row>
                </Grid>

        )
    }
}
