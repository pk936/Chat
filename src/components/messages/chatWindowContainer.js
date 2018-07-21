/**
 * Created by piyush on 7/5/18.
 */

import React from 'react';
import {
    Container,
    Header,
    List,
    Grid,
    Col,
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
import {AsyncStorage} from 'react-native';
import moment from 'moment';
import {GiftedChat} from 'react-native-gifted-chat';
import {fetchChatRequest, fetchChatSuccess, fetchChatFailure} from '../messages/chatActions';
import jwtDecode from'jwt-decode';

class ChatWindowContainer extends React.Component {
    constructor(props) {
        super();
        // this.state
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
        // console.log('this.props', this.props.navigation.getParam());
        let {navigation} = this.props;
        let userId = navigation.getParam('userId');
        let name = navigation.getParam('name');
        let image = navigation.getParam('image');

        // console.log('this.props.ActiveChat.data', this.props.ActiveChat.data);

        if (this.props.ActiveChat.data) {
            let messages = [{
                _id: Math.random(),
                text: `You are now connected with ${name}`,
                createdAt: new Date(),
                system:true
            }, ...this.props.ActiveChat.data.messages]

            return <Container>
                    <Header>
                        <Left>
                            <Icon></Icon>
                        </Left>
                        <Body style={{alignItems:'left', flexDirection:'flex-start'}}>
                                <Thumbnail small source={image} />
                                <Text style={{color:'#fff'}}>{name}</Text>
                        </Body>
                    </Header>
                    <Content contentContainerStyle={{flexGrow:1}}>
                        <GiftedChat messages={messages}
                                    user={{_id:this.loggedInUserId}}/>
                    </Content>
                </Container>
        } else {
            return <Spinner />
        }


        // return <Container>
        //             <Header>
        //                 <Left>
        //                     <Icon></Icon>
        //                 </Left>
        //                 <Body>
        //                     <Grid>
        //                         <Col style={{width:'2'}}>
        //                             <Thumbnail small source={image} />
        //                         </Col>
        //                         <Col>
        //                             <Text style={{color:'#fff'}}>{name}</Text>
        //                         </Col>
        //                     </Grid>
        //                 </Body>
        //             </Header>
        //             <Content>
        //                 <Text>123</Text>
        //             </Content>
        // </Container>
    }
}

const mapStateToProps = (state) => {
    return {
        ActiveChat: state.Chat.chat,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchChat(id){
            return new Promise((resolve, reject) => {
                AsyncStorage.getItem('jwt').then(token => {
                    dispatch(fetchChatRequest(id, token)).then((result) => {
                        console.log('result.payload.data', result.payload.data)
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