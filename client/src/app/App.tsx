import React, { Component } from 'react'
import Routes from './routes/Routes'
import './App.css'
import Footer from './components/Footer'

class App extends Component {
  render() {
    return (
      <div>
        <div className="app-content">
          <Routes />
        </div>
        <Footer/>
      </div>
    )
  }
}

export default App