/**
 * Created by piyush on 7/15/18.
 */
const {
    FETCH_CHAT_REQUEST,
    FETCH_CHAT_SUCCESS,
    FETCH_CHAT_FAILURE
} = require('./keyMirror').default;

const INITIAL_STATE = {
    chat:{data:null,loading:false, error:false}
}

export default UserReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case FETCH_CHAT_REQUEST:
            return {...state, chat:{data:null, loading:true,error:false}}
        case FETCH_CHAT_SUCCESS:
            return {...state, chat:{data:action.payload, loading:false,error:false}}
        case FETCH_CHAT_FAILURE:
            return {...state, chat:{data:null, loading:false,error:action.payload}}

        default: return state;
    }
}