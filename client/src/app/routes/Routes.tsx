import React from 'react'
import { Route } from 'react-router'
import { Switch } from 'react-router-dom'
import Register from './Register/Register'

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Register} />
      </Switch>
    )
  }
}

export default Routes