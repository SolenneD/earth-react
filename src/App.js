import React, { Component } from 'react'

import './App.css'
import { Provider } from 'react-redux'
import store from './store'
import Scene from './components/Scene'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Scene />
      </Provider>
    )
  }
}

export default App
