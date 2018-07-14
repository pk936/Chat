const {
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE
} = require('./keyMirror').default;


const initialState = {
    signIn: {loading:false, error:false}
}

export default signInReducer = (state=initialState, action) => {
    switch(action.type){
        case SIGN_IN_REQUEST:
            return {...state, loading:true};
        case SIGN_IN_SUCCESS:
            return {...state, loading:false, error:true,message:action.payload.message};
        case SIGN_IN_FAILURE:
            return {...state, loading:false, error:action.payload.error, message:action.payload.message};
    }

    return {...state};
}