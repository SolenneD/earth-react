import React, { Component } from 'react'

import './App.css'
import { Provider } from 'react-redux'
import { Scene } from './components/Scene'
import store from './store'

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
