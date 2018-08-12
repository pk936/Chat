/**
 * Created by piyush on 7/15/18.
 */
const {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
} = require('./keyMirror').default;

const INITIAL_STATE = {
    user:{data:null,loading:false, error:false}
}

export default UserReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case FETCH_USER_REQUEST:
            return {...state, user:{data:null, loading:true,error:false}}
        case FETCH_USER_SUCCESS:
            return {...state, user:{data:action.payload, loading:false,error:false}}
        case FETCH_USER_FAILURE:
            return {...state, user:{data:null, loading:false,error:action.payload}}

        default: return state;
    }
}