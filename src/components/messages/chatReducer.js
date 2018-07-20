/**
 * Created by piyush on 7/15/18.
 */
const {
    FETCH_CHAT_REQUEST,
    FETCH_CHAT_SUCCESS,
    FETCH_CHAT_FAILURE,
    FETCH_ALL_CHAT_REQUEST,
    FETCH_ALL_CHAT_SUCCESS,
    FETCH_ALL_CHAT_FAILURE
} = require('./keyMirror').default;

const INITIAL_STATE = {
    chat:{data:null,loading:false, error:false},
    chat_list:{data:null,loading:false, error:false}
}

export default chatReducer = (state=INITIAL_STATE, action) => {
    // console.log('action.payload.....',action.payload)
    switch(action.type){
        case FETCH_CHAT_REQUEST:
            return {...state, chat:{data:null, loading:true,error:false}}
        case FETCH_CHAT_SUCCESS:
            return {...state, chat:{data:action.payload, loading:false,error:false}}
        case FETCH_CHAT_FAILURE:
            return {...state, chat:{data:null, loading:false,error:action.payload}}

        case FETCH_ALL_CHAT_REQUEST:
            return {...state, chat_list:{data:null, loading:true,error:false}}
        case FETCH_ALL_CHAT_SUCCESS:
            return {...state, chat_list:{data:action.payload, loading:false,error:false}}
        case FETCH_ALL_CHAT_FAILURE:
            return {...state, chat_list:{data:null, loading:false,error:action.payload}}


        default: return state;
    }
}