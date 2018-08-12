/**
 * Created by piyush on 7/5/18.
 */

import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Image, AsyncStorage} from 'react-native';
import {View,Grid, Row, Spinner, Container, Header, List, ListItem,Thumbnail, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {fetchAllChatRequest,fetchAllChatSuccess,fetchAllChatFailure} from '../messages/chatActions';
import {fetchUsersRequest,fetchUsersSuccess,fetchUsersFailure} from '../users/userActions';
import {fetchUserRequest,fetchUserSuccess,fetchUserFailure} from '../profile/profileActions';
import {fetchTeamsRequest,fetchTeamsSuccess,fetchTeamsFailure} from '../teams/teamActions';

import jwtDecode from 'jwt-decode';

const style = StyleSheet.create({
    container:{
        backgroundColor: '#584692',
        alignItems:'center',
        flex:1,
        flexDirection: 'column',
    },
    heading:{
        fontSize:20,
        color:'#fff'
    }
})

class WelcomeUser extends React.Component {
    constructor(props){
        super();
    }

    componentDidMount(){
        // let req1 = this.props.fetchUsers;
        // let req2 = this.props.fetchAllChat;

        AsyncStorage.getItem('jwt').then(tokn=> {
            if (tokn) {
                let userId = jwtDecode(tokn).id;
                Promise.all(
                    this.props.fetchUsers(10,0,tokn),
                    this.props.fetchAllChat(10,0,tokn),
                    this.props.fetchTeams(10,0,tokn),
                    this.props.fetchUser(userId,tokn)
                ).then(result => {
                    // console.log('FETCHED ALL', result)
                    this.props.navigation.navigate('Home');
                })
                // this.setState({userName:jwtDecode(tokn).name})
            }
        });
    }

    render(){
        let {User} = this.props;
        let userName = User.data ? User.data.name : '';

        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#556edf',
            }}>
                <View style={{height:150, width:200}}>
                    <Thumbnail large style={{alignSelf:'center'}}
                           source={require('../../../assets/images/default_profile_img.jpeg')}
                    />
                </View>
                <View>
                    <Text style={style.heading}>
                        Welcome, {userName}
                    </Text>
                </View>
                <View>
                    <Spinner color="#ed7140"/>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        User:state.LoggedInUser.loggedInUser
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        fetchUsers(limit,offset, token){
            return new Promise ((resolve,reject) => {
                // AsyncStorage.getItem('jwt').then(token => {
                    dispatch(fetchUsersRequest(limit, offset, token)).then((result) => {
                        if (result.payload.data.meta.success) {
                            dispatch(fetchUsersSuccess(result.payload.data.data))
                            resolve(result.payload.data.data)
                        } else {
                            dispatch(fetchUsersFailure(result))
                            reject('Cannot fetch users !')
                        }
                    }).catch(err => {
                        dispatch(fetchUsersFailure('Cannot fetch users !'))
                        reject('Cannot fetch users !')
                    })
                // })
            })
        },

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
        },

        fetchTeams(limit,offset, token){
            return new Promise ((resolve,reject) => {
                // AsyncStorage.getItem('jwt').then(token=>{
                    // console.log('TOKEN IS', token)
                    dispatch(fetchTeamsRequest(limit,offset,token)).then((result) => {
                        if(result.payload.data){
                            dispatch(fetchTeamsSuccess(result.payload.data))
                        }else{
                            dispatch(fetchTeamsFailure(result.payload.data))
                        }
                    }).catch(err=>{
                        dispatch(fetchTeamsFailure('Something went wrong !'))
                        reject('Something went wrong !')
                    })
                // })
            })
        },

        fetchAllChat(limit,offset,token){
            return new Promise((resolve, reject) => {
                // AsyncStorage.getItem('jwt').then(token => {
                    dispatch(fetchAllChatRequest(limit,offset, token)).then(( result) => {
                        if (result.payload.data) {
                            dispatch(fetchAllChatSuccess(result.payload.data))
                        } else {
                            dispatch(fetchAllChatFailure(result.payload.data))
                        }
                    }).catch(err => {
                        console.log('err', err)
                        dispatch(fetchAllChatFailure('Cant fetch your chat !'))
                        reject('Cant fetch your chat !');
                    })
                })
            // })
        }
    }
}

export default connect(mapStateToProps, mapDispatchProps)(WelcomeUser);
