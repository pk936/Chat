/**
 * Created by piyush on 7/5/18.
 */

import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Image, AsyncStorage} from 'react-native';
import {View,Grid, Row, Spinner, Container, Header, List, ListItem,Thumbnail, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {fetchUsersRequest,fetchUsersSuccess,fetchUsersFailure} from '../users/userActions';

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
        // let req2 = this.props.fetchMessages;

        Promise.all(this.props.fetchUsers()).then(result=>{
            // console.log('FETCHED ALL', result)
            // this.props.navigation.navigate('Home');
        })

        setTimeout(
            ()=>{
                AsyncStorage.removeItem('jwt', '')
            },3000
        )
    }

    render(){
        let {User} = this.props;
        let {navigation} = this.props;
        // console.log('ActiveUser', User);

        let userName = navigation.getParam('userName');

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
    console.log('STATE............', state)
    return {
        User:state.ActiveUser.user
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        fetchUsers(limit,offset){
            return new Promise ((resolve,reject) => {
                AsyncStorage.getItem('jwt').then(token => {
                    dispatch(fetchUsersRequest(limit, offset, token)).then((result) => {
                        console.log('result.payload', result.payload.data.meta.success);
                        if (result.payload.data.meta.success) {
                            dispatch(fetchUsersSuccess(result.payload.data.data))
                            console.log('FETCH_USERS_SUCCESS 11111')

                            resolve(result.payload.data.data)
                        } else {
                            dispatch(fetchUsersFailure(result))
                            reject('Cannot fetch users !')
                        }
                    }).catch(err => {
                        dispatch(fetchUsersFailure('Cannot fetch users !'))
                        reject('Cannot fetch users !')
                    })
                })
            })
        },

        // fetchMessages(){
        //     return new Promise((resolve, reject) => {
        //         dispatch(fetchMessages()).then((result) => {
        //             console.log('FETCH MESSAGEGS', result)
        //             if (result.success) {
        //                 dispatch(fetchMessagesSuccess(result))
        //             } else {
        //                 dispatch(fetchMessagesFailure(result))
        //             }
        //         }).catch(err => {
        //             dispatch(fetchUsersFailure('Something went wrong !'))
        //             reject('Something went wrong !')
        //         })
        //     })
        // }
    }
}

export default connect(mapStateToProps, mapDispatchProps)(WelcomeUser);
