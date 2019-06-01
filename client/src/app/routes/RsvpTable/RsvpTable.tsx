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
            <thead className="">
              <tr className="">
                <th colSpan={1} className="">
                  Name
                </th>
                <th colSpan={2} className="">
                  Reply
                </th>
                <th colSpan={1} className="">
                  Note
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.responses.map(response => (
                <tr className="" key={response.id}>
                  <td colSpan={1} className="">
                      {response.firstName} {response.lastName}
                  </td>
                  <td colSpan={1} className="">
                      {response.reply ? 'yes' : 'no'}
                  </td>
                  <td colSpan={1} className="">
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
