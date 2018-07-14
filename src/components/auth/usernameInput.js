/**
 * Created by piyush on 7/5/18.
 */

import React from 'react';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {StyleSheet,View} from 'react-native';
import {Container, Header,Content,Form, Item,Input,InputGroup, Label, Spinner,Button,Text, Icon, Toast} from 'native-base';
import {AsyncStorage} from 'react-native';
import {emailValidations,passwordValidations} from '../../validation/signinVaidations';
import {validate} from 'validate.js';

export default class UsernameInput extends React.Component {
    constructor(props){
        super();
    }

    changeUserName = (e) => {
        this.props.changeUserName(e);
        // this.props.navigation.navigate('Home');
    }

    render(){
        let {error}= this.props;
        let wrongCredential = {};
        if(error){
            wrongCredential['error'] = true;
        }

        return (
            <InputGroup borderType="regular">
                <Icon name='ios-person' style={{color:'#fff'}}/>
                <Input style={{color:'#fff'}} autoFocus
                       selectionColor="orange"
                       keyboardType="email-address"
                       returnKeyType="next"
                       onChangeText={this.changeUserName} />
            </InputGroup>
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
