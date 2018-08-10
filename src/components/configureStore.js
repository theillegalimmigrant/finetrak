import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers/finetrakReducers'

export default () => {
    const middlewares = [thunk];
    const store = createStore(reducers, applyMiddleware(...middlewares), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

    return store;
};