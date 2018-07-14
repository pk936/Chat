/**
 * Created by piyush on 7/5/18.
 */

import React from 'react';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {StyleSheet,View} from 'react-native';
import {Container, Header,Content,Form, Item,Input, Label, Spinner,Button,Text, Icon, Toast} from 'native-base';
import {AsyncStorage} from 'react-native';

export default class SignInButton extends React.Component {
    constructor(props){
        super();
    }

    changePassword = (e) => {
        this.props.changePassword(e);
        // this.props.navigation.navigate('Home');
    }

    render(){
        let {authenticating, validateCredentials}= this.props;
        let disableButton = authenticating ? {disabled:'disabled'} : {};

        return (
            <Button title="signin" transparent bordered rounded light block
                    onPress={validateCredentials}
                    {...disableButton}
                    style={{backgroundColor:'transparent', marginTop:20}}
                    iconRight>

                <Text>SignIn</Text>
                {authenticating ? <Spinner color="#fff" /> : <Icon name="ios-log-in" />}
            </Button>
        )
    }
}

const style = StyleSheet.create({
    view:{
        flex:1,
        alignItems: 'center',
        alignContent: 'space-around',
    }
})
