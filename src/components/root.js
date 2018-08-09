import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Provider} from 'react-redux';

import {init as firebaseInit} from 'javascript/firebase';
import Routes from './routes';
import configureStore from './configureStore';

class Root extends Component {
  constructor(props) {
    super(props)
    firebaseInit();
    this.store = configureStore();
  }
render() {
    return (
        <Provider store={this.store}>
          <Routes history={browserHistory}/>
      </Provider>
    )
  }
}
export default Root
