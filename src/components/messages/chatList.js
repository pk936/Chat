/**
 * Created by piyush on 7/5/18.
 */

import React from 'react';
import {
    View,
    Container,
    Header,
    List,
    Spinner,
    ListItem,
    Thumbnail,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Text
} from 'native-base';
import {connect} from 'react-redux';
import {FlatList, ScrollView} from 'react-native';
import moment from 'moment';
const anonymousUser = require('../../../assets/images/default_profile_img.jpeg');

export default class ChatList extends React.Component {
    constructor(props) {
        super();
        this.state = {
            refreshing: false,
            loading: false
        }

        this.loading = false;
    }

    startConversation = (recipientId, name, image) => {
        this.props.navigation.navigate('ChatWindow', {
            recipientId, name, image
        })
    }

    viewProfile = (userId, name, image) => {
        this.props.navigation.navigate('Profile', {
            userId, name, image
        })
    }


    loadMoreChat = () => {
        let {chatList, loadMoreChat} = this.props;
        // console.log('Refrshing', chatList.meta.totalCount , chatList.data.length);
        if (!this.loading) {// This method is being called twice, so i set loading flag
            this.loading = true;
            if (chatList.meta.totalCount > chatList.data.length) {
                this.setState({loading: true});
                loadMoreChat(10, chatList.data.length).then(res => {
                    // console.log('res', res)
                    this.setState({loading: false});
                })
            } else {
                this.setState({loading: false});
            }
        }
    }

    onRefresh = () => {
        this.setState({refreshing: true});
        let {chatList, loadMoreChat} = this.props;
        loadMoreChat(chatList.data.length, 0).then(res => {
            // console.log('res', res)
            this.setState({refreshing: false});
        })
    }

    render() {
        // onRefresh etc are working becoz i have disabled content property scrollEnabled={false}in wrappercontainer.
        // contentContainerStyle is also added so that scolling cabe done in flatlist
        let {chatList} = this.props;
        let {refreshing, loading} = this.state;
        // console.log('refreshing', refreshing)
        let list = <FlatList keyExtractor={chat => chat.id}
                             refreshing={refreshing}
                             onRefresh={this.onRefresh}
                             onEndReached={this.loadMoreChat}
                             onEndReachedThreshold={0.1}
                             ListFooterComponent={loading ? <Spinner/> : null}
            // onMomentumScrollBegin={this.onRefresh}
            // onScrollStartDrag={this.onRefresh}

            // refreshControl={
            //     <RefreshControl
            //         refreshing={this.state.refreshing}
            //         onRefresh={this.onRefresh}
            //     />
            // }

                             data={chatList.data}
                             renderItem={({item}) => {
                                 // item is predeclared as objType in renderItem. You have to use it.
                                 let recipient = item.attributes.recipient[0];
                                 let uri = recipient.avatarThumb ? {uri: recipient.avatarThumb} : anonymousUser;
                                 let lastMsg = item.attributes.messages[0];

                                 return <ListItem avatar
                                                  onPress={() => this.startConversation(recipient.recipientId, recipient.recipientName, uri)}>
                                     <Left>
                                         <Thumbnail small source={uri}
                                                    onPress={() => this.viewProfile(recipient.recipientId, recipient.recipientName, uri)}/>

                                     </Left>
                                     <Body>
                                     <Text style={{fontSize: 14}}>{recipient.recipientName}</Text>
                                     <Text note>{lastMsg ? lastMsg.message : ''}</Text>
                                     </Body>
                                     <Right>
                                         <Text note
                                               style={{fontSize: 14}}>{lastMsg ? moment(lastMsg.timestamp).fromNow() : ''}</Text>
                                     </Right>
                                 </ListItem>
                             }

                             }
        />
        return <List>{list}</List>;
    }
}
