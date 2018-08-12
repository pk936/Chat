import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet,View, Image, AsyncStorage} from 'react-native';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Container,Toast, Thumbnail,Header,Body,Content,Title,Left,H3,
    Form, Item,Input, Label, Button,Text, Icon,
    CardItem,Card,Right
} from 'native-base';
import {fetchUserRequest,fetchUserSuccess,fetchUserFailure} from './profileActions';
import jwtDecode from 'jwt-decode';
const anonymousUser = require('../../../assets/images/default_profile_img.jpeg');
import UserProfile from './userProfile';

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

class UserContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userInfo:null
        }
    }

    logOut= (e) => {
        AsyncStorage.removeItem('jwt');
        this.props.navigation.navigate('Auth')
    }

    componentDidMount() {

        let {navigation} = this.props;

        if (navigation.getParam('userId')) {
            let id = navigation.getParam('userId');
            this.props.fetchUser(id).then(res => {
                this.setState({userInfo: res})
            });
        } else {
            AsyncStorage.getItem('jwt').then(tkn => {
                this.props.fetchUser(jwtDecode(tkn).id, tkn).then(res => {
                    // this.setState({userInfo: res})
                });
            })
        }

    }

    render(){
        let {ActiveUser} = this.props;
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Me</Title>
                    </Body>
                </Header>
                <Content contentContainerStyle={{ flexGrow: 1}}>
                    <UserProfile activeUser={ActiveUser.data}/>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        ActiveUser:state.ActiveUser.user
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        fetchUser(id, token){
            return new Promise ((resolve,reject) => {
                dispatch(fetchUserRequest(id,token)).then((result) => {

                    if(result.payload.data){
                        dispatch(fetchUserSuccess(result.payload.data))
                    }else{
                        dispatch(fetchUserFailure(result.payload.data))
                    }
                }).catch(err=>{
                    console.log('err', err)
                    dispatch(fetchUserFailure('Something went wrong !'))
                    reject('Something went wrong !')
                })
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserContainer);