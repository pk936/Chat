import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet,View,ScrollView, Image, AsyncStorage} from 'react-native';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Container,Toast, Thumbnail,Header,Body,Content,Form, Item,Input, Label, Button,Text, Icon} from 'native-base';
import SignInForm from "./signInForm";
import {signInRequest,signInSuccess,signInFailure} from './signInActions';
import { KeyboardAvoidingView } from 'react-native';
import signinConstraints from '../../validation/signinVaidations';
import {validate} from 'validate.js';

const style = StyleSheet.create({
    container:{
        backgroundColor: '#556edf', //'#584692'
    },
    view:{
        flex:1,
        // alignItems: 'center',
        // alignContent: 'space-around',
        justifyContent: 'center',
    },
    image:{
        width:50,
        height:50,
        alignSelf:'center'
    }
})

class SignInContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            authenticating:false
        }
    }

    onSubmitCredentials = (credentials) => {
        let err = validate({...credentials},signinConstraints);
        if(err) {
            Toast.show({
                text: err.username ? err.username[0] : err.password[0],
                buttonText: 'okay'
            })
        }else {

            this.props.onSubmitCredentials(credentials).then(result => {
                // result contains token, exp etc.
                this.props.navigation.navigate('WelcomeUser', {
                    'userName':result.name
                });
            }).catch(err => {
                Toast.show({
                    text: err,
                    buttonText: 'okay'
                })
            });
        }
    }

    render(){
        // console.log('.',this.props);
        let {User} = this.props;
        return (
            <Container style={style.container}>
                <Content  style={{flexDirection:'column'}} padder
                          contentContainerStyle={{ flexGrow: 1,
                              justifyContent:'center'}}>
                            {/*style={{alignItems:'center'}}*/}
                    <View

                        contentContainerStyle={{flexGrow : 1,
                            }}

                    >
                        {/*<View stye={{*/}
                            {/*flex: 1,*/}

{/*// Set content's horizontal alignment.*/}
                            {/*alignItems: 'center',*/}

                            {/*backgroundColor: '#FFF8E1',*/}
                        {/*}}>*/}

                        <KeyboardAvoidingView enabled
                                              style={{ flex: 1 }}
                                              behavior={"position"}
                        >
                            <Thumbnail style={style.image}
                                       source={require('../../../assets/images/ibism_logo.png')}/>

                            <SignInForm
                                authenticating={User.loading}
                                onSubmitCredentials={this.onSubmitCredentials} />
                            </KeyboardAvoidingView>
                        {/*</View>*/}
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) =>{
    // console.log('STATE', state);
    return {
        User:state.LoggedInUser.loggedInUser
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        onSubmitCredentials(credentials){
            return new Promise((resolve, reject)=>{
                dispatch(signInRequest(credentials)).then(result => {
                    if(result.payload.data.success){
                        dispatch(signInSuccess(result.payload.data))
                        resolve(result.payload.data);
                    }else{
                        dispatch(signInFailure('Invalid Credentials !'))
                        reject('Invalid Credentials !')
                    }
                }).catch(err=>{
                    dispatch(signInFailure('Cannot login due to some technical issue !'))
                    reject('Cannot login due to some technical issue !')
                })
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignInContainer);