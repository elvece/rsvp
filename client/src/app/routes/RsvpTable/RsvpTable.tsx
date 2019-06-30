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
    const sorted = res.data.sort((a, b) => b.reply - a.reply)
    this.setState({ responses: sorted, loading: false })
  }

  render () {
    return (
        <div className="RsvpTable">
          <table className="RsvpTable-table">
          <thead className="RsvpTable-row-header">
              <th colSpan={1}>
                name
              </th>
            <th colSpan={1}>
              email
              </th>
              <th colSpan={2}>
                reply
              </th>
              <th colSpan={1}>
                note
              </th>
          </thead>
          <tbody className="RsvpTable-body">
            {this.state.responses.map(response => (
              <tr key={response.id}>
                <td colSpan={1}>
                    {response.firstName} {response.lastName}
                </td>
                <td colSpan={1}>
                  {response.email}
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
