import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet,View, Image, AsyncStorage} from 'react-native';
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
        // flex:1,
        alignItems: 'center',
        // alignContent: 'space-around',
        // justifyContent: 'center',
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
            // this.setState({authenticating:true});

            this.props.onSubmitCredentials(credentials).then(result => {
                // result contains token, exp etc.
                this.props.navigation.navigate('WelcomeUser', {
                    'userName':result.name
                });
            }).catch(err => {
                // this.setState({error: true, authenticating: false})
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
                <Content padder contentContainerStyle={{ flexGrow: 1 }}>
                    <Grid style={style.view}>
                        <Col>
                            {/*style={{alignItems:'center'}}*/}
                            <Thumbnail style={style.image}
                                       source={require('../../../assets/images/ibism_logo.png')}/>

                                <SignInForm
                                    authenticating={User.loading}
                                    onSubmitCredentials={this.onSubmitCredentials} />

                        </Col>
                    </Grid>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) =>{
    // console.log('STATE', state);
    return {
        User:state.ActiveUser.user
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