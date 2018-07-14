const {
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE
} = require('./keyMirror').default;


const initialState = {
    user: {user:null, loading:false, error:false}
}

export default signInReducer = (state=initialState, action) => {
    console.log('action', action.payload);
    switch (action.type) {
        case SIGN_IN_REQUEST:
            return {...state, loading: true};
        case SIGN_IN_SUCCESS:
            return {...state, user: action.payload, loading: false, error: true};
        case SIGN_IN_FAILURE:
            return {...state, user: null, loading: false, error: action.payload};
    }

    return {...state};
}