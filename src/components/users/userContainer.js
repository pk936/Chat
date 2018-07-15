import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet,View, Image, AsyncStorage} from 'react-native';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Container,Toast, Thumbnail,Header,Body,Content,Form, Item,Input, Label, Button,Text, Icon} from 'native-base';
import {fetchUsersRequest,fetchUsersSuccess,fetchUsersFailure} from './userActions';

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
            authenticating:false
        }
    }

    // componentWillReceiveProps(nxtProps){
    //     console.log('NXT PROPSSSSSSSSSSSSSSSSS', nxtProps)
    // }

    onSubmitCredentials = (credentials) => {

    }

    render(){
        // console.log('.',this.props);
        let {User} = this.props;
        return (
            <Container style={style.container}>
                <Content padder contentContainerStyle={{ flexGrow: 1 }}>
                    <Grid style={style.view}>
                        <Col>

                        </Col>
                    </Grid>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) =>{
    // console.log('STATE', state);
    return {
        User:state.ActiveUser.user
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        fetchUsers(limit,offset){
            return new Promise ((resolve,reject) => {
                AsyncStorage.getItem('jwt').then(token=>{
                    console.log('TOKEN IS', token)
                    dispatch(fetchUsersRequest(limit,offset,token)).then((result) => {
                        if(result.payload.data.success){
                            dispatch(fetchUsersSuccess(result))
                        }else{
                            dispatch(fetchUsersFailure(result))
                        }
                    }).catch(err=>{
                        dispatch(fetchUsersFailure('Something went wrong !'))
                        reject('Something went wrong !')
                    })
                })
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserContainer);