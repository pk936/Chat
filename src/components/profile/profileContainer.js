import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet,View, Image, AsyncStorage} from 'react-native';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Container,Toast, Thumbnail,Header,Body,Content,Title,Left,H3,
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
        // let {userInfo} = this.state;
        let user = null,userInfo,name,image,role,email, phone,teams=[];
        if(ActiveUser.data) {
            user = ActiveUser.data.data;
            userInfo = user.attributes;
            name = userInfo.name;
            role = user.relationships.role.data.name;
            image = userInfo.avatar_thumb ? {uri: userInfo.avatar_thumb} : anonymousUser;
            email = userInfo.email ? userInfo.email : '-';
            phone = userInfo.phone ? userInfo.phone : '-';
            teams = user.relationships.teams.data.length > 0 ? user.relationships.teams.data.map(t=>t.name).join() : 'All Teams';
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
                <Content contentContainerStyle={{ flexGrow: 1}}>
                    <Grid>
                        <Row size={2}>
                            <View style={{flex:1,backgroundColor:'#556edf',alignItems:'center',justifyContent:'center'}}>
                                <Thumbnail large source={image}/>
                                <H3 style={{color:'#fff',paddingTop:20}}>{name}</H3>
                                <Text style={{color:'#fff',padding:5, fontSize:14}}>{role}</Text>
                            </View>
                        </Row>
                        <Row size={3}>
                            <View style={{flex:1,justifyContent:'center'}}>
                    <Card transparent>
                        <CardItem>
                            <Icon active name="mail" />
                            <Text>{email}</Text>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Icon active name="ios-call" />
                            <Text>{phone}</Text>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Icon active name="ios-people" />
                            <Text>{teams}</Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent onPress={e=>this.logOut(e)}>
                                    <Icon active name="log-out" />
                                    <Text>Logout</Text>
                                </Button>
                            </Left>
                            <Body>
                            {/*<Button transparent>*/}
                                {/*<Icon active name="chatbubbles" />*/}
                                {/*<Text>4 Comments</Text>*/}
                            {/*</Button>*/}
                            </Body>
                        </CardItem>
                    </Card>
                            </View>
                        </Row>
                    </Grid>
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