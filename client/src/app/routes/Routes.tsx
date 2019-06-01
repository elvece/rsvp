import React from 'react'
import { Route } from 'react-router'
import { Switch } from 'react-router-dom'
import Register from './Register/Register'
import RsvpTable from './RsvpTable/RsvpTable'

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/rsvps" component={RsvpTable} />
        <Route path="/" component={Register} />
      </Switch>
    )
  }
}

export default Routes