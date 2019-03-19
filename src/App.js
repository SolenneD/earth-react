import React, { Component } from 'react'

import './App.css'
import { Provider } from 'react-redux'
import { Scene } from './components/Scene'

class App extends Component {
  render() {
    return (
      <Provider>
        <Scene />
      </Provider>
    )
  }
}

export default App
