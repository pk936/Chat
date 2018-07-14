/**
 * Created by piyush on 7/5/18.
 */

import React from 'react';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {StyleSheet,View} from 'react-native';
import {Container, Header,Content,Form, Item,Input, Label, Spinner,Button,Text, Icon, Toast} from 'native-base';
import {AsyncStorage} from 'react-native';


export default class PasswordInput extends React.Component {
    constructor(props){
        super();
    }

    changePassword = (e) => {
        this.props.changePassword(e);
        // this.props.navigation.navigate('Home');
    }

    render(){
        let {error}= this.props;
        let wrongCredential = {};
        if(error){
            wrongCredential['error'] = true;
        }

        return (
            <Item {...wrongCredential}>
                <Icon name='ios-unlock' style={{color:'#fff'}}/>
                <Input style={{color:'#fff'}}
                       secureTextEntry
                       returnKeyType="next"
                       onChangeText={this.changePassword} />
            </Item>
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
