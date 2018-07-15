/**
 * Created by piyush on 7/10/18.
 */
import React from 'react';
import {View,Text} from 'native-base';
import WelcomeUser from "./components/home/welcomeUser";
import {AsyncStorage} from 'react-native';

export default class WrapperContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isUserAuthorized:false
        }
    }

    componentDidMount(){
        // let token = AsyncStorage.getItem('jwt').then(userAuthenticate=>{
        //     if(userAuthenticate){
        //         this.setState({isUserAuthorized:true})
        //         // this.props.navigation.navigate('HomeScreen')
        //     }
        // })
        // this.props.navigation.navigate('Home');
    }

    render(){
        return (
            <View style={{flex:1}}>
                <Text>123</Text>
            </View>
        )
    }
}