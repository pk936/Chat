/**
 * Created by piyush on 7/10/18.
 */
import React from 'react';
import {View,Text, Container, Header, Item,Toast, Tabs, Tab,Input, Icon,TabHeading, Content,Footer,FooterTab,Button } from 'native-base';
import WelcomeUser from "./components/home/welcomeUser";
import {NetInfo, AsyncStorage, StatusBar} from 'react-native';
import UserContainer from "./components/users/userContainer";
import BottomTabNavigator from './screens/bottomTabNavigator';
import ChatListContainer from './components/messages/chatListContainer';
import TeamContainer from './components/teams/teamContainer';
import socket from './setup/socket';
import {appendChatSuccess, updateAllChatSuccess} from './components/messages/chatActions';
import {connect} from 'react-redux';
import SearchContainer from "./components/search/searchContainer";
const anonymousUser = require('../assets/images/default_profile_img.jpeg');

class WrapperContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showSearchResultPage:false
        }
    }

    // componentDidUpdate(){
    //     NetInfo.isConnected.addEventListener('connectionChange', this.connectionChanged)
    //
    // }

    componentDidMount(){
        // let isUserOffline = false;
        socket.on('disconnect', ()=>{
            // console.log('DISCONNECTED');
            // isUserOffline='Yes';
            Toast.show({
                text:'No connection',
                duration:20000,
                position: "top"
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

            let msgToAppendOrUpdateInList = {
                attributes:{
                    accountId:'ABC',
                    members:[chat.author, chat.recipientId],
                    messages:[{
                        author:chat.author,
                        message:chat.message,
                        timestamp:chat.timestamp
                    }],
                    recipient:[{
                        avatarThumb:null,
                        recipientId:chat.recipientId,
                        recipientName:chat.recipientName
                    }],
                },
                id:chat.conversation_id,
                type:'conversations'
            }

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

                this.props.appendChatSuccess(msg,msgToAppendOrUpdateInList)
            }else{
                this.props.updateAllChatSuccess(msgToAppendOrUpdateInList)
            }
        })
    }

    connectionChanged(isConnected){
        let text = isConnected ? 'We are back !' : 'We lost you !';
        Toast.show({text});
    }

    toggleSearchResult = () => {
        // this.props.navigation.navigate('SearchResult');
        this.setState({showSearchResultPage:!this.state.showSearchResultPage})
    }

    viewProfile = () => {
        // this.props.navigation.navigate('Profile', {
        //     userId:this.props.LoggedInUser.data.id
        // })
        this.props.navigation.navigate('Profile');
    }

    render(){
        let {navigation} = this.props;
        let {showSearchResultPage} = this.state;
        return (
            <Container>
                <Header searchBar rounded>
                    <Item>
                        {
                            showSearchResultPage ? <Icon name="arrow-back"/>
                                :
                                <Icon name="search"/>

                        }
                        <Input placeholder="search" onFocus={this.toggleSearchResult} />
                        <Icon name="people" />
                    </Item>
                </Header>
                <Content contentContainerStyle={{flex:1}} scrollEnabled={false}>
                    {
                        showSearchResultPage ?
                            <SearchContainer toggleSearchResult={this.toggleSearchResult} navigation={navigation}/>
                            :
                            <Tabs>
                                <Tab heading="Messages">
                                    <ChatListContainer navigation={navigation}/>
                                </Tab>
                                <Tab heading="Users">
                                    <UserContainer navigation={navigation}/>
                                </Tab>
                                <Tab heading="Teams">
                                    <TeamContainer navigation={navigation}/>
                                </Tab>
                            </Tabs>
                    }
                </Content>
                {
                    !showSearchResultPage &&

                    <Footer>
                        <FooterTab>
                            <Button vertical>
                                <Icon name="apps"/>
                                <Text>Apps</Text>
                            </Button>
                            <Button vertical>
                                <Icon name="camera"/>
                                <Text>Camera</Text>
                            </Button>
                            <Button vertical active>
                                <Icon active name="navigate"/>
                                <Text>Navigate</Text>
                            </Button>
                            <Button vertical onPress={this.viewProfile}>
                                <Icon name="person"/>
                                <Text>Me</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                }
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log('STATE', state.Chat.chat)
    return {
        ActiveChat: state.Chat.chat,
        // LoggedInUser:state.LoggedInUser.loggedInUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appendChatSuccess(msg, msgToAppendOrUpdateInList){
            dispatch(appendChatSuccess(msg))
            dispatch(updateAllChatSuccess(msgToAppendOrUpdateInList))
        },

        updateAllChatSuccess(msg){
            dispatch(updateAllChatSuccess(msg))
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrapperContainer);