import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers/finetrakReducers'

export default () => {
    const middlewares = [thunk];
    const store = createStore(reducers, applyMiddleware(...middlewares));

    return store;
};