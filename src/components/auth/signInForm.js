/**
 * Created by piyush on 7/5/18.
 */

import React from 'react';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {StyleSheet,View} from 'react-native';
import {Container, Header,Content,Form,InputGroup, Item,Input, Label, Spinner,Button,Text, Icon, Toast} from 'native-base';
import {AsyncStorage} from 'react-native';
import UsernameInput from "./usernameInput";
import PasswordInput from "./passwordInput";
import SignInButton from "./signInButton";

export default class SignInForm extends React.Component {
    constructor(props){
        super();
        this.username = null;
        this.password = null;
    }

    validateCredentials = () => {
        this.props.onSubmitCredentials({username:this.username,password:this.password})
    }

    changeUserName = (e) => {
        this.username = e;
    }

    changePassword = (e) => {
        this.password = e;
    }

    render(){
        let {authenticating} = this.props;
        // let {error, invalidEmail}= this.state;
        // let wrongCredential = {};
        // if(error){
        //     wrongCredential['error'] = true;
        // }

        return (
            <View style={{marginTop:50}}>
                <UsernameInput
                changeUserName={this.changeUserName}/>
                <PasswordInput
                changePassword={this.changePassword}/>
                <SignInButton validateCredentials={this.validateCredentials}
                              authenticating={authenticating}/>
            </View>
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
