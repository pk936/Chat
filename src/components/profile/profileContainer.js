import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet,View, Image, AsyncStorage} from 'react-native';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Container,Toast, Thumbnail,Header,Body,Content,Title,Left,
    Form, Item,Input, Label, Button,Text, Icon,
    CardItem,Card,Right

} from 'native-base';
import {fetchUserRequest,fetchUserSuccess,fetchUserFailure} from './profileActions';
import UserList from './userProfile';
import jwtDecode from 'jwt-decode';
const anonymousUser = require('../../../assets/images/default_profile_img.jpeg');

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

    // componentWillReceiveProps(nxtProps){
    //     console.log('NXT PROPSSSSSSSSSSSSSSSSS', nxtProps)
    // }

    logOut= (e) => {
        AsyncStorage.removeItem('jwt');
        this.props.navigation.navigate('Auth')
    }

    componentDidMount() {
        // this.props.fetchUser(id).then(res=>{
        //     this.setState({userInfo:res})
        // });

        // AsyncStorage.getItem('jwt').then(tkn=>{
            let {navigation} = this.props;
        //     let {User} = this.props;
        //     // console.log('navigation.getParam',navigation.getParam('userId'));
        //
        if (navigation.getParam('userId')) {
            let id = navigation.getParam('userId');
            // if(navigation.getParam('userId') === User.data.id){
            this.props.fetchUser(id).then(res => {
                this.setState({userInfo: res})
            });
            // }
        } else {
            // this.userInfo = jwtDecode(tkn);
            AsyncStorage.getItem('jwt').then(tkn => {
                this.props.fetchUser(jwtDecode(tkn).id, tkn).then(res => {
                    // this.setState({userInfo: res})
                });
            })
        }

    }

    render(){
        // console.log('.',this.props);
        let {ActiveUser} = this.props;
        let {userInfo} = this.state;
        let user = null,name,image,role,email, phone;
        if(ActiveUser.data) {
            user = ActiveUser.data.data;
            name = user.attributes.name;
            role = user.relationships.role.data.name;
            image = user.attributes.avatar_thumb ? {uri: user.attributes.avatar_thumb} : anonymousUser;
            email = user.attributes.email;
            phone = user.attributes.phone;

        }
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
                <Content padder >
                    {/*contentContainerStyle={{ flexGrow: 1, alignItems:'center' }}*/}
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={image} />
                                <Body>
                                <Text>{name}</Text>
                                <Text note>{role}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Icon active name="logo-googleplus" />
                            <Text>{email}</Text>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Icon active name="logo-googleplus" />
                            <Text>{phone}</Text>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent>
                                    <Icon active name="thumbs-up" />
                                    <Text>12 Likes</Text>
                                </Button>
                            </Left>
                            <Body>
                            {/*<Button transparent>*/}
                                {/*<Icon active name="chatbubbles" />*/}
                                {/*<Text>4 Comments</Text>*/}
                            {/*</Button>*/}
                            </Body>
                            <Right>
                                <Text>11h ago</Text>
                            </Right>
                        </CardItem>
                    </Card>


                    {/*<Thumbnail large source={image}/>*/}

                    <Button onPress={e=>this.logOut(e)}>
                        <Text>
                            Logout
                        </Text>
                    </Button>
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