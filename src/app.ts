import * as express from 'express'
import * as cors from 'cors'
import * as bp from 'body-parser'
import { getManager } from 'typeorm'
import { Rsvp } from './model'

const app: express.Application = express()
const router: express.Router = express.Router()

app.use(morgan('dev'))
app.use(bp.json({ type: 'application/json' }))
app.use(bp.urlencoded({ type: 'application/x-www-form-urlencoded', extended: false }))
app.use(cors())

app.use('/register', async (req, res, next) => {
  const data = req.body as RegisterRequest
  try {
    const rsvp = await getManager().create(Rsvp, { ...data })
    res.status(200).json(rsvp)
  } catch (e) {
    res.status(500).json(e)
  }
})

export default app

interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  reply: boolean
}

