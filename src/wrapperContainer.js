/**
 * Created by piyush on 7/10/18.
 */
import React from 'react';
import {View,Text, Container, Header, Item, Tabs, Tab,Input, Icon, Content,Footer,FooterTab,Button } from 'native-base';
import WelcomeUser from "./components/home/welcomeUser";
import {AsyncStorage} from 'react-native';
import UserContainer from "./components/users/userContainer";
import BottomTabNavigator from './screens/bottomTabNavigator';
export default class WrapperContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isUserAuthorized:false
        }
    }

    componentDidMount(){
        let token = AsyncStorage.getItem('jwt').then(userAuthenticate=>{
            if(userAuthenticate){
                this.setState({isUserAuthorized:true})
                // this.props.navigation.navigate('HomeScreen')
            }
        }).catch(res=>{
            this.props.navigation.navigate('Auth');
        })
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