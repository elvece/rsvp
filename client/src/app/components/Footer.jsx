import React, { Component } from 'react'
import '../App.css'

class Footer extends Component {

  render() {
    return (
      <footer className="app-stamp">
        <p>made by</p>
        <a href="https://www.elvece.com" target="_blank" rel="noopener noreferrer">
          <img className="app-logo" src={require(`../assets/icon.jpg`)} alt="elvece"/>
        </a>
      </footer>
    );
  }
}

export default Footer