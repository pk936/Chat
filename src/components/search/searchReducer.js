/**
 * Created by piyush on 7/15/18.
 */
const {
    FETCH_SEARCH_REQUEST,
    FETCH_SEARCH_SUCCESS,
    FETCH_SEARCH_FAILURE
} = require('./keyMirror').default;

const INITIAL_STATE = {
    search:{data:null,loading:false, error:false}
}

export default UserReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case FETCH_SEARCH_REQUEST:
            return {...state, search:{data:null, loading:true,error:false}}
        case FETCH_SEARCH_SUCCESS:
            return {...state, search:{data:action.payload, loading:false,error:false}}
        case FETCH_SEARCH_FAILURE:
            return {...state, search:{data:null, loading:false,error:action.payload}}

        default: return state;
    }
}