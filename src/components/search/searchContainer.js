import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet,View, Image, AsyncStorage, BackHandler,Alert} from 'react-native';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Container,Toast, Thumbnail,Header,Body,Content,Form, Item,Input, Label, Button,Text, Icon} from 'native-base';
import {fetchSearchRequest,fetchSearchSuccess,fetchSearchFailure} from './searchActions';
import SearchList from './searchList';

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

class SearchContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            authenticating:false
        }
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress',this.handleDeviceBackButtonPress);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress',this.handleDeviceBackButtonPress);
    }

    handleDeviceBackButtonPress = () => {
        // Alert.alert(
        //     'Thoát Khỏi Ứng Dụng',
        //     'Bạn có muốn thoát không?', [{
        //         text: 'Cancel',
        //         onPress: () => console.log('Cancel Pressed'),
        //         style: 'cancel'
        //     }, {
        //         text: 'OK',
        //         onPress: () => BackHandler.exitApp()
        //     }, ], {
        //         cancelable: false
        //     }
        // )
        return true
    }

    // componentWillReceiveProps(nxtProps){
    //     console.log('NXT PROPSSSSSSSSSSSSSSSSS', nxtProps)
    // }

    render(){
        // console.log('.',this.props);
        let {Search, navigation} = this.props;
        {/*<SearchList search={Search} navigation={navigation} />*/}
        return (
            <Text>Search Result Will be displayed here !</Text>
        )
    }
}

const mapStateToProps = (state) =>{
    // console.log('STATE', state.Search);
    return {
        Search:state.Search.search.data
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        fetchSearch(limit,offset){
            return new Promise ((resolve,reject) => {
                AsyncStorage.getItem('jwt').then(token=>{
                    // console.log('TOKEN IS', token)
                    dispatch(fetchSearchRequest(limit,offset,token)).then((result) => {
                        if(result.payload.data.success){
                            dispatch(fetchSearchSuccess(result))
                        }else{
                            dispatch(fetchSearchFailure(result))
                        }
                    }).catch(err=>{
                        dispatch(fetchSearchFailure('Something went wrong !'))
                        reject('Something went wrong !')
                    })
                })
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchContainer);