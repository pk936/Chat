const {
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE
} = require('./keyMirror').default;


const initialState = {
    user: {data:null, loading:false, error:false}
}

export default SignInReducer = (state=initialState, action) => {
    // console.log('action', action);
    switch (action.type) {
        case SIGN_IN_REQUEST:
            return {...state, user:{data:null, loading: true, error: false}};
        case SIGN_IN_SUCCESS:
            return {...state, user:{data:action.payload, loading: false, error: false}};
        case SIGN_IN_FAILURE:
            return {...state, user:{data:null, loading: false, error: action.payload}};
        default:
            return state;
    }
}