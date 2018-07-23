/**
 * Created by piyush on 7/15/18.
 */
const {
    FETCH_CHAT_REQUEST,
    FETCH_CHAT_SUCCESS,
    FETCH_CHAT_FAILURE,
    APPEND_CHAT_REQUEST,
    RESET_CHAT,
    APPEND_CHAT_SUCCESS,
    APPEND_CHAT_FAILURE,
    FETCH_ALL_CHAT_REQUEST,
    FETCH_ALL_CHAT_SUCCESS,
    FETCH_ALL_CHAT_FAILURE,
    UPDATE_ALL_CHAT_SUCCESS
} = require('./keyMirror').default;

const INITIAL_STATE = {
    chat:{data:null},
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

        case RESET_CHAT:
            return {...state, chat:{data:null, loading:false,error:false}}

            // case APPEND_CHAT_REQUEST:
        //     return {...state, chat:{data:null, loading:true,error:false}}
        case APPEND_CHAT_SUCCESS:
            return {...state, chat:{data:{messages:[action.payload,...state.chat.data.messages]}, loading:false,error:false}}

        case APPEND_CHAT_FAILURE:
            return {...state, chat:{data:state.chat.data, loading:false,error:action.payload}}

        case FETCH_ALL_CHAT_REQUEST:
            return {...state, chat_list:{data:null, loading:true,error:false}}
        case FETCH_ALL_CHAT_SUCCESS:
            return {...state, chat_list:{data:action.payload, loading:false,error:false}}
        case FETCH_ALL_CHAT_FAILURE:
            return {...state, chat_list:{data:null, loading:false,error:action.payload}}

        case UPDATE_ALL_CHAT_SUCCESS:
            let data = null;
            if(state.chat_list.data){
                data = [...state.chat_list.data];
                let chat = data.find(chat=>chat.id === action.payload.id);
                // console.log('chat',chat, action.payload);
                if(chat){
                    chat.attributes.messages = [action.payload.attributes.messages, ...chat.attributes.messages]
                }else{
                    data.unshift(action.payload)
                }
            }

            return {...state, chat_list:{data, loading:false,error:false}}

        default: return state;
    }
}