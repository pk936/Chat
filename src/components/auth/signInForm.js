/**
 * Created by piyush on 7/5/18.
 */

import React from 'react';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {StyleSheet,View, ScrollView, KeyboardAvoidingView} from 'react-native';
import {Container, Header,Content,Form,InputGroup, Item,Input, Label, Spinner,Button,Text, Icon, Toast} from 'native-base';
import {AsyncStorage} from 'react-native';
import UsernameInput from "./usernameInput";
import PasswordInput from "./passwordInput";
import SignInButton from "./signInButton";
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class SignInForm extends React.Component {
    constructor(props){
        super();
        this.state = {
            pswd:null
        }
        this.username = null;
        this.password = null;
    }

    validateCredentials = () => {
        this.setState({pswd:'a'});

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
                {/*<ScrollView>*/}
                    {/*<KeyboardAvoidingView behavior="padding" enabled>*/}
                        <UsernameInput
                        changeUserName={this.changeUserName}/>
                        <PasswordInput
                        changePassword={this.changePassword}/>
                    {/*</KeyboardAvoidingView>*/}
                {/*</ScrollView>*/}

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
