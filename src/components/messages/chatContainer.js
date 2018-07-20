import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet,View, Image, AsyncStorage} from 'react-native';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Container,Toast, Thumbnail,List,ListItem,Left,Right, Header,Body,Content,Form, Item,Input, Label, Button,Text, Icon} from 'native-base';
import moment from 'moment';
import ChatList from './chatList';

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


class ChatContainer extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        let {ChatList:chatList} = this.props;

        return chatList.data ?
                <ChatList chatList={chatList}/>
            : <Text>No Conversation yet !</Text>;
    }
}

const mapStateToProps = (state) =>{
    // console.log('STATE', state.ChatList);
    return {
        ChatList:state.Chat.chat_list
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        // fetchUsers(limit,offset){
        //     return new Promise ((resolve,reject) => {
        //         AsyncStorage.getItem('jwt').then(token=>{
        //             dispatch(fetchUsersRequest(limit,offset,token)).then((result) => {
        //                 if(result.payload.data.success){
        //                     dispatch(fetchUsersSuccess(result))
        //                 }else{
        //                     dispatch(fetchUsersFailure(result))
        //                 }
        //             }).catch(err=>{
        //                 dispatch(fetchUsersFailure('Something went wrong !'))
        //                 reject('Something went wrong !')
        //             })
        //         })
        //     })
        // }
    }
}

export default connect(mapStateToProps)(ChatContainer);