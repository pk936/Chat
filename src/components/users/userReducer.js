/**
 * Created by piyush on 7/15/18.
 */
const {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE
} = require('./keyMirror').default;

const INITIAL_STATE = {
    users:{data:null,loading:false, error:false}
}

export default UserReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return {...state, users:{data:null, loading:true,error:false}}
        case FETCH_USERS_SUCCESS:
            return {...state, users:{data:action.payload, loading:false,error:false}}
        case FETCH_USERS_FAILURE:
            return {...state, users:{data:null, loading:false,error:action.payload}}

        default: return state;
    }
}