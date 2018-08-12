/**
 * Created by piyush on 7/5/18.
 */
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import rootReducer from './setup/rootReducer';

const middleware = applyMiddleware(thunk,promise);
const store = createStore(rootReducer, middleware);

export default store;