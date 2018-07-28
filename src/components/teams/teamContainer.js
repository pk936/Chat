import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet,View, Image, AsyncStorage} from 'react-native';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Container,Toast, Thumbnail,Header,Body,Content,Form, Item,Input, Label, Button,Text, Icon} from 'native-base';
import {fetchTeamsRequest,fetchTeamsSuccess,fetchTeamsFailure} from './teamActions';
import TeamList from './teamList';

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

class TeamContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            authenticating:false
        }
    }


    // componentWillReceiveProps(nxtProps){
    //     console.log('NXT PROPSSSSSSSSSSSSSSSSS', nxtProps)
    // }

    render(){
        // console.log('.',this.props);
        let {Teams, navigation} = this.props;
        return (
            <TeamList teams={Teams} navigation={navigation} />
        )
    }
}

const mapStateToProps = (state) =>{
    // console.log('STATE', state.Teams);
    return {
        Teams:state.Teams.teams.data
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        fetchTeams(limit,offset){
            return new Promise ((resolve,reject) => {
                AsyncStorage.getItem('jwt').then(token=>{
                    // console.log('TOKEN IS', token)
                    dispatch(fetchTeamsRequest(limit,offset,token)).then((result) => {
                        if(result.payload.data.success){
                            dispatch(fetchTeamsSuccess(result))
                        }else{
                            dispatch(fetchTeamsFailure(result))
                        }
                    }).catch(err=>{
                        dispatch(fetchTeamsFailure('Something went wrong !'))
                        reject('Something went wrong !')
                    })
                })
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TeamContainer);