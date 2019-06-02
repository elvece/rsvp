import axios, { AxiosInstance } from 'axios'

export class WebService {
  requests: AxiosInstance

  constructor(baseURL: string = '') {
    this.requests = axios.create({
      baseURL,
      headers: { 'Content-Type': 'application/json' },
      timeout: 1500
    })
  }

  createRsvp = async (body: CreateRsvpRequest) => {
    return this.requests.post('/rsvp/register', { ...body })
  }

  getRsvps = async () => {
    return this.requests.get('/rsvp/all')
  }
}

export const webService = new WebService()

interface CreateRsvpRequest {
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  response: boolean
  notes: string
}