import * as express from 'express'
import * as cors from 'cors'
import * as morgan from 'morgan'
import * as bp from 'body-parser'
import { getManager } from 'typeorm'
import { Rsvp } from './model'

import * as Ajv from 'ajv'
var ajv = new Ajv({ allErrors: true })

var schema = {
  type: 'object',
  properties: {
    firstName: { type: 'string', pattern: '^(?!.*\\d)', minLength: 2, maxLength: 120 },
    lastName: { type: 'string', pattern: '^(?!.*\\d)', minLength: 2, maxLength: 120 },
    email: { type: 'string', format: 'email', maxLength: 128 }
  }
}

const app: express.Application = express()
const router: express.Router = express.Router()

app.use(morgan('dev'))
app.use(bp.json({ type: 'application/json' }))
app.use(bp.urlencoded({ type: 'application/x-www-form-urlencoded', extended: false }))
app.use(cors())

app.post('/rsvp/register', validate(ajv.compile(schema)), async (req, res, next) => {
  const data = req.body as RegisterRequest
  try {
    const rsvp = await getManager().save(Rsvp, { ...data })
    res.status(200).json(rsvp)
  } catch (e) {
    res.status(500).json(e)
  }
  next()
})

app.get('/rsvp/all', async (req, res, next) => {
  // todo auth me
  try {
    const all = await getManager().find(Rsvp)
    res.status(200).json(all)
  } catch (e) {
    res.status(500).json(e)
  }
  next()
})

export default app

interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  reply: boolean
}


export function validate(validator: Ajv.ValidateFunction) {
  return function (req, res, next) {
    if (validator(req.body) !== true) {
      next(JSON.stringify(validator.errors))
    } else {
      next()
    }
  }
}

// catch all error handling
app.use(function (err, req, res, next) {
  res.status(500).send(err)
})