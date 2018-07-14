/**
 * Created by piyush on 7/5/18.
 */

import React from 'react';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {StyleSheet,View} from 'react-native';
import {Container, Header,Content,Form, Item,Input, Label, Spinner,Button,Text, Icon, Toast} from 'native-base';
import {AsyncStorage} from 'react-native';
import UsernameInput from "./usernameInput";
import PasswordInput from "./passwordInput";
import SignInButton from "./signInButton";
import signinConstraints from '../../validation/signinVaidations';
import {validate} from 'validate.js';

export default class SignInForm extends React.Component {
    constructor(props){
        super();
        this.state = {
            error:false,
            authenticating:false
        }

        this.username = null;
        this.password = null;
    }

    validateCredentials = () => {
        let username = this.username;
        let password = this.password;

        let err = validate({username,password},signinConstraints)

        console.log('res...', err, username,password);

        if(err){
            this.setState({error: true, authenticating: false})
            Toast.show({
                text: err.username ? err.username[0] : err.password[0],
                buttonText: 'okay'
            })
        }else {
            this.props.onSubmitCredentials({username,password})
        }
    }

    changeUserName = (e) => {
        console.log(e);
        this.username = e;
    }

    changePassword = (e) => {
        this.password = e;
    }

    render(){
        let {navigation} = this.props;
        let {error, invalidEmail,authenticating}= this.state;
        let wrongCredential = {};
        if(error){
            wrongCredential['error'] = true;
        }

        return (
            <Form style={{marginTop:50}}>
                <UsernameInput error={error}
                               changeUserName={this.changeUserName}/>
                <PasswordInput error={error}
                               changePassword={this.changePassword}/>

                <SignInButton validateCredentials={this.validateCredentials}
                              authenticating={authenticating}/>
            </Form>
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
