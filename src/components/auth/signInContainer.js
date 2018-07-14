import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet,View, Image, AsyncStorage} from 'react-native';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Container,Toast, Header,Body,Content,Form, Item,Input, Label, Button,Text, Icon} from 'native-base';
import SignInForm from "./signInForm";
import {signInRequest,signInSuccess,signInFailure} from './signInActions';
import { KeyboardAvoidingView } from 'react-native';

const style = StyleSheet.create({
    container:{
        backgroundColor: '#556edf', //'#584692'
        flex:1,
    },
    view:{
        // flex:1,
        alignItems: 'center',
        // alignContent: 'space-around',
        // justifyContent: 'center',
    },
    image:{
        width:50,
        height:50
    }
})

class SignInContainer extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        AsyncStorage.setItem('username','p@g.com');
    }

    onSubmitCredentials = (credentials) => {
        this.setState({authenticating:true});
        this.props.onSubmitCredentials(credentials).then(result=>{
            this.props.navigation.navigate('Home');
        }).catch(err=>{
            console.log('err', err);
            this.setState({error: true, authenticating: false})
            Toast.show({
                text: 'Invalid credentials',
                buttonText: 'okay'
            })
        });
    }

    render(){
        // console.log('.',this.props);
        let {navigation} = this.props
        return (
            <Container paddr style={style.container}>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <Grid style={style.view}>
                        <Col>
                            <KeyboardAvoidingView behavior="padding">
                                <Image style={style.image}
                                       source={require('../../../assets/images/ibism_logo.png')}/>
                                <SignInForm onSubmitCredentials={this.onSubmitCredentials} />
                            </KeyboardAvoidingView>
                        </Col>
                    </Grid>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        User:state.signin
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        onSubmitCredentials(credentials){
            return new Promise((resolve, reject)=>{
                console.log('credentials', credentials)
                dispatch(signInRequest(credentials)).then(result => {
                    console.log('RESULT....', result);
                    resolve(result);
                })
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignInContainer);