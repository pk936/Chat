/**
 * Created by piyush on 7/5/18.
 */

import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {View,Grid, Row, Spinner, Container, Header, List, ListItem,Thumbnail, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

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

export default class HomeScreen extends React.Component {
    constructor(props){
        super();
    }

    // componentDidMount(){
    //     let req1 = this.props.fetchUsers;
    //     let req2 = this.props.fetchMessages;
    //
    //     Promise.all(req1,req2).then(result=>{
    //         console.log('FETCHED ALL', result)
    //     })
    // }

    render(){
        let {user} = this.props;
        return (

            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#556edf',
            }}>
                <View style={{height:150, width:200}}>
                    {/*<Thumbnail*/}
                        {/*large*/}
                        {/*style={{*/}
                            {/*width: 300, height: 300, position: 'absolute',*/}
                            {/*resizeMode: 'center'*/}
                        {/*}}*/}
                        {/*source={require('../../../assets/images/home_screen_background.png')}*/}
                    {/*/>*/}
                    <Thumbnail large
                           source={require('../../../assets/images/default_profile_img.jpeg')}
                       />
                </View>
                <View>
                    <Text style={style.heading}>
                        Welcome Piyush
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
        User:state
    }
}

const mapDispatchProps = (dispatch) => {
    return (
        fetchUsers = () => {
            return new Promise ((resolve,reject) => {
                dispatch(fetchUsers).then((result) => {
                    console.log('FETCH USERS', result)
                    if(result.success){
                        dispatch(fetchUsersSuccess(result))
                    }else{
                        dispatch(fetchUsersFailure(result))
                    }
                })
            })
        },

        fetchMessages = () => {
            return new Promise ((resolve,reject) => {
                dispatch(fetchMessages()).then((result) => {
                    console.log('FETCH USERS', result)
                    if(result.success){
                        dispatch(fetchMessagesSuccess(result))
                    }else{
                        dispatch(fetchMessagesFailure(result))
                    }
                })
            })
        }
    )
}
