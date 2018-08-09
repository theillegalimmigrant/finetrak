import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import {init as firebaseInit} from 'javascript/firebase'
import Routes from './routes'
class Root extends Component {
  constructor(props) {
    super(props)
    firebaseInit();
  }
render() {
    return (
      <Routes history={browserHistory}/>
    )
  }
}
export default Root
