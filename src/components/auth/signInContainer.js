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

    componentDidMount(){
        AsyncStorage.setItem('username','p@g.com');
    }

    onSubmitCredentials = (credentials) => {
        this.setState({authenticating:true});
        let err = validate({...credentials},signinConstraints);
        if(err) {
            this.setState({error: true, authenticating: false})
            Toast.show({
                text: err.username ? err.username[0] : err.password[0],
                buttonText: 'okay'
            })
        }else {
            this.props.onSubmitCredentials(credentials).then(result => {
                this.props.navigation.navigate('Home');
            }).catch(err => {
                this.setState({error: true, authenticating: false})
                Toast.show({
                    text: err,
                    buttonText: 'okay'
                })
            });
        }
    }

    render(){
        // console.log('.',this.props);
        let {user} = this.props;
        let {authenticating} = this.state;
        return (
            <Container style={style.container}>
                <Content padder contentContainerStyle={{ flexGrow: 1 }}>
                    <Grid style={style.view}>
                        <Col>
                            {/*style={{alignItems:'center'}}*/}
                            <Thumbnail style={style.image}
                                       source={require('../../../assets/images/ibism_logo.png')}/>

                            <KeyboardAvoidingView behavior="padding">
                                <SignInForm
                                    authenticating={authenticating}
                                    onSubmitCredentials={this.onSubmitCredentials} />
                            </KeyboardAvoidingView>
                        </Col>
                    </Grid>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) =>{
    console.log('STATE', state);
    return {
        User:state.user
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        onSubmitCredentials(credentials){
            return new Promise((resolve, reject)=>{
                dispatch(signInRequest(credentials)).then(result => {
                    if(result.payload.data.success){
                        dispatch(signInSuccess(result.payload.data))
                        resolve(result);
                    }else{
                        dispatch(signInFailure('Invalid Credentials !'))
                        reject()
                    }
                }).catch(err=>{
                    dispatch(signInFailure('Something went wrong !'))
                    reject()
                })
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignInContainer);