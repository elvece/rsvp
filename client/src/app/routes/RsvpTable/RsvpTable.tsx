import React, { Component } from 'react'
import { webService } from 'app/services/WebService'
import './RsvpTable.css'

class RsvpTable extends Component {

  state = {
    responses: [],
    loading: true
  }

  async componentDidMount () {
    const res = await webService.getRsvps()
    this.setState({ responses: res.data, loading: false })
  }

  render () {
    return (
        <div className="RsvpTable">
          <table className="RsvpTable-table">
          <thead>
            <tr className="RsvpTable-row-header">
                <th colSpan={1}>
                  name
                </th>
                <th colSpan={2}>
                  reply
                </th>
                <th colSpan={1}>
                  note
                </th>
              </tr>
            </thead>
            <tbody className="RsvpTable-body">
              {this.state.responses.map(response => (
                <tr key={response.id}>
                  <td colSpan={1}>
                      {response.firstName} {response.lastName}
                  </td>
                  <td colSpan={1}>
                      {response.reply ? 'yes' : 'no'}
                  </td>
                  <td colSpan={2}>
                      {response.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    )
  }
}

export default RsvpTable
