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
import {fetchChatRequest, fetchChatSuccess, fetchChatFailure} from '../messages/chatActions';
import jwtDecode from'jwt-decode';
import ChatWindow from "./chatWindow";

class ChatWindowContainer extends React.Component {
    constructor(props) {
        super();
        this.loggedInUserId = null;
    }

    componentDidMount() {
        let {navigation} = this.props;
        let userId = navigation.getParam('userId');
        // fetch user id from redux.. this is temporary
        AsyncStorage.getItem('jwt').then(tkn=>{
            this.loggedInUserId = jwtDecode(tkn).id;
            this.props.fetchChat(userId);
        })
    }

    render() {
        let {navigation} = this.props;
        let recipientId = navigation.getParam('recipientId');
        let name = navigation.getParam('name');
        let image = navigation.getParam('image');

        if (this.props.ActiveChat.data) {
            let messages = [{
                _id: Math.random(),
                text: `You are now connected with ${name}`,
                createdAt: new Date(),
                system:true
            }, ...this.props.ActiveChat.data.messages]

            return <Container>
                    <Header>
                        <Body>
                            <View style={{alignItems:'left'}}>
                                <Thumbnail small source={image} />
                                <Text style={{color:'#fff'}}>{name}</Text>
                            </View>
                        </Body>
                    </Header>
                    <Content contentContainerStyle={{flexGrow:1}}>
                        <ChatWindow messages={messages}
                                    recipientId={recipientId}
                                    loggedInUserId={this.loggedInUserId}/>
                    </Content>
                </Container>
        } else {
            return <Spinner />
        }
    }
}

const mapStateToProps = (state) => {
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindowContainer);