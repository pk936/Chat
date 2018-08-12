import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet,View, Image, AsyncStorage} from 'react-native';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Container,Toast, Spinner,Thumbnail,List,ListItem,Left,Right, Header,Body,Content,Form, Item,Input, Label, Button,Text, Icon} from 'native-base';
import moment from 'moment';
import ChatList from './chatList';
import {fetchAllChatRequest,fetchAllChatSuccess,fetchAllChatFailure} from './chatActions';

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


class ChatListContainer extends React.Component {
    constructor(props){
        super(props);
    }

    // loadMoreChat = (limit,offset) => {
    //     this.props.fetchAllChat(limit,offset)
    // }

    render(){
        let {ChatList:chatList, navigation,fetchAllChat} = this.props;

        let showLoader = chatList.loading && <Spinner />;
        // <Text>No Conversation yet !</Text>;
        console.log('DATA', !!chatList.data);

        // if(chatList.loading){
        //     return <Spinner />;
        // }

        if(!!chatList.data){
            return <ChatList chatList={chatList.data}
                              navigation={navigation}
                              loadMoreChat={fetchAllChat}/>
        }

        return <Text>No Conversation yet !</Text>;

    }
}

const mapStateToProps = (state) =>{
    return {
        ChatList:state.Chat.chat_list
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        fetchAllChat(limit,offset){
            return new Promise((resolve, reject) => {
                AsyncStorage.getItem('jwt').then(token => {
                    dispatch(fetchAllChatRequest(limit, offset, token)).then((result) => {
                        // console.log('RESULT', Object.keys(result.payload.data))
                        if (result.payload.data) {
                            dispatch(fetchAllChatSuccess(result.payload.data))
                            resolve(result.payload.data)
                        } else {
                            dispatch(fetchAllChatFailure(result.payload.data));
                            reject(result.payload.data);
                        }
                    }).catch(err => {
                        console.log('err', err)
                        dispatch(fetchAllChatFailure('Cant fetch your chat !'))
                        reject('Cant fetch your chat !');
                    })
                })
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChatListContainer);