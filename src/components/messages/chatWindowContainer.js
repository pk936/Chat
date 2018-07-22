/**
 * Created by piyush on 7/5/18.
 */

import React from 'react';
import {
    Container,
    Header,
    Spinner,
    Thumbnail,
    Content,
    Body,
    View,
    Text
} from 'native-base';
import {connect} from 'react-redux';
import {AsyncStorage} from 'react-native';
import {fetchChatRequest, fetchChatSuccess, fetchChatFailure,resetActiveChat} from '../messages/chatActions';
import jwtDecode from'jwt-decode';
import ChatWindow from "./chatWindow";

class ChatWindowContainer extends React.Component {
    constructor(props) {
        super();
        this.loggedInUserId = null;
    }

    componentDidMount() {
        this.fetchRecipient(this.props);
    }
    //
    // componentWillReceiveProps(nxtProps){
    //     this.fetchRecipient(nxtProps)
    // }

    fetchRecipient = (props) => {
        let {navigation} = props;
        let recipientId = navigation.getParam('recipientId');
        this.props.resetActiveChat();
        // fetch user id from redux.. this is temporary

        AsyncStorage.getItem('jwt').then(tkn=>{
            this.loggedInUserId = jwtDecode(tkn).id;
            this.props.fetchChat(recipientId);
        });
    }

    render() {
        let {navigation, ActiveChat} = this.props;
        let recipientId = navigation.getParam('recipientId');
        let name = navigation.getParam('name');
        let image = navigation.getParam('image');
        // console.log('image', image);
        return <Container>
                    <Header>
                        <Body>
                            <View>
                                <Thumbnail small source={image} />
                                <Text style={{color:'#fff'}}>{name}</Text>
                            </View>
                        </Body>
                    </Header>
                    <Content contentContainerStyle={{flexGrow:1}}>
                        <ChatWindow data={ActiveChat.data}
                                    recipientId={recipientId}
                                    recipientName={name}
                                    loggedInUserId={this.loggedInUserId}/>
                    </Content>
                </Container>

    }
}

const mapStateToProps = (state) => {
    // console.log('STATE', state.Chat.chat)
    return {
        ActiveChat: state.Chat.chat
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchChat(id){
            return new Promise((resolve, reject) => {
                AsyncStorage.getItem('jwt').then(token => {
                    dispatch(fetchChatRequest(id, token)).then((result) => {
                        // console.log('result.payload.data',result.payload.data)
                        if (result.payload.data.data) {
                            dispatch(fetchChatSuccess(result.payload.data.data))
                        } else {
                            dispatch(fetchChatFailure(result.payload.data.data))
                        }
                    }).catch(err => {
                        // console.log('err', err)
                        dispatch(fetchChatFailure('Cant fetch your chat !'))
                        reject('Cant fetch your chat !');
                    })
                })
            })
        },

        resetActiveChat(){
            dispatch(resetActiveChat());
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindowContainer);