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


export default class WrapperContainer extends React.Component {
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
    }

    connectionChanged(isConnected){
        let text = isConnected ? 'We are back !' : 'We lost you !';
        Toast.show({text});
    }

    render(){
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
                            <ChatContainer />
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