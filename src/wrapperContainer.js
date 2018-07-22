/**
 * Created by piyush on 7/10/18.
 */
import React from 'react';
import {View,Text, Container, Header, Item,Toast, Tabs, Tab,Input, Icon, Content,Footer,FooterTab,Button } from 'native-base';
import WelcomeUser from "./components/home/welcomeUser";
import {NetInfo, AsyncStorage, StatusBar} from 'react-native';
import UserContainer from "./components/users/userContainer";
import BottomTabNavigator from './screens/bottomTabNavigator';
import ChatContainer from './components/messages/chatContainer';
import socket from './setup/socket';
import {appendChatSuccess, updateAllChatSuccess} from './components/messages/chatActions';
import {connect} from 'react-redux';
const anonymousUser = require('../assets/images/default_profile_img.jpeg');

class WrapperContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isUserAuthorized:false
        }
    }

    componentDidMount(){
        // let isUserOffline = false;
        socket.on('disconnect', ()=>{
            // console.log('DISCONNECTED');
            // isUserOffline='Yes';
            Toast.show({
                text:'Slow internet connectivity!',
                duration:20000
            })
        })

        // socket.on('connect', ()=>{
        //     if(isUserOffline === 'Yes') {
        //         console.log('CONNECTED');
        //         Toast.show({
        //             text: 'Connected!'
        //         })
        //     }
        //
        //     isUserOffline = false;
        // })

        NetInfo.isConnected.addEventListener('connectionChange', this.connectionChanged)

        // Hide status bar from all over the app
        StatusBar.setHidden(true)

        socket.on('chats', (chat)=>{
            // console.log('RECIEVING', chat, this.props.ActiveChat);

            if(this.props.ActiveChat.data) { // if chat window is opened
                let msg = {
                    _id: chat.timestamp,
                    text: chat.message,
                    createdAt: chat.timestamp,
                    user: {
                        _id: chat.author,
                        name: chat.recipientName,
                        avatar: anonymousUser, // no image is in socket yet !
                    },
                }

                this.props.appendChatSuccess(msg)
            }else{
                let msg = {
                    attributes:{
                        accountId:'ABC',
                        members:[chat.author, chat.recipientId],
                        messages:{
                            author:chat.author,
                            message:chat.message,
                            timestamp:chat.timestamp
                        },
                        recipient:{
                            avatarThumb:anonymousUser,
                            recipientId:chat.recipientId,
                            recipientName:chat.recipientName
                        },
                    },
                    id:chat.conversation_id,
                    type:'conversations'
                }

                this.props.updateAllChatSuccess(msg)
            }
        })
    }

    connectionChanged(isConnected){
        let text = isConnected ? 'We are back !' : 'We lost you !';
        Toast.show({text});
    }

    render(){
        let {navigation} = this.props;
        return (
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="search"/>
                        <Icon name="ios-people" />
                    </Item>
                </Header>
                <Content>
                    <Tabs>
                        <Tab heading="Messages">
                            <ChatContainer navigation={navigation}/>
                        </Tab>
                        <Tab heading="Users">
                            <UserContainer />
                        </Tab>
                    </Tabs>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button onPress={e=>this.props.navigation.navigate('Profile')}>
                            <Text>
                                Profile
                            </Text>
                        </Button>
                        <Button onPress={e=>this.props.navigation.navigate('Profile')}>
                            <Text>
                                Settings
                            </Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log('STATE', state.Chat.chat)
    return {
        ActiveChat: state.Chat.chat

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appendChatSuccess(msg){
            dispatch(appendChatSuccess(msg))
        },

        updateAllChatSuccess(msg){
            dispatch(updateAllChatSuccess(msg))
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrapperContainer);