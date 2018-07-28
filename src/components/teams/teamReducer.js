/**
 * Created by piyush on 7/15/18.
 */
const {
    FETCH_TEAMS_REQUEST,
    FETCH_TEAMS_SUCCESS,
    FETCH_TEAMS_FAILURE
} = require('./keyMirror').default;

const INITIAL_STATE = {
    teams:{data:null,loading:false, error:false}
}

export default UserReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case FETCH_TEAMS_REQUEST:
            return {...state, teams:{data:null, loading:true,error:false}}
        case FETCH_TEAMS_SUCCESS:
            return {...state, teams:{data:action.payload, loading:false,error:false}}
        case FETCH_TEAMS_FAILURE:
            return {...state, teams:{data:null, loading:false,error:action.payload}}

        default: return state;
    }
}