/**
 * Created by piyush on 7/5/18.
 */

import React from 'react';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {StyleSheet,View} from 'react-native';
import {Container, Header,Content,Form, Item,Input, Label, Spinner,Button,Text, Icon, Toast} from 'native-base';
import {AsyncStorage} from 'react-native';

const SignInButton = (props) => {
    let {authenticating, validateCredentials} = props;
    // console.log('authenticating',authenticating)
    return (
        <Button title="signin" rounded light block
                onPress={validateCredentials}
                disabled={authenticating}
                style={{marginTop:20}}
                iconRight>

            <Text>SignIn</Text>
            {authenticating ? <Spinner color="#fff" /> : <Icon name="ios-log-in" />}
        </Button>
    )
}

const style = StyleSheet.create({
    view:{
        flex:1,
        alignItems: 'center',
        alignContent: 'space-around',
    }
})

export default SignInButton;
