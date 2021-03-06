import 'reflect-metadata'
import * as express from 'express'
import * as cors from 'cors'
import * as morgan from 'morgan'
import * as bp from 'body-parser'
import * as bcrypt from 'bcrypt'
import * as R from 'ramda'
import * as session from 'express-session'
import * as Ajv from 'ajv'
import { getManager } from 'typeorm'
import { User, Rsvp } from './models'
import { getStoreConnString } from './helpers'
import * as path from 'path'
const ajv = new Ajv({ allErrors: true })

const register = {
  type: 'object',
  properties: {
    firstName: { type: 'string', pattern: '^(?!.*\\d)', minLength: 2, maxLength: 120 },
    lastName: { type: 'string', pattern: '^(?!.*\\d)', minLength: 2, maxLength: 120 },
    email: { type: 'string', format: 'email', maxLength: 128 },
    reply: { type: 'string' },
    note: { type: 'string', pattern: '^(?!.*\\d)', maxLength: 240 }
  }
}

const login = {
  type: 'object',
  properties: {
    userName: { type: 'string', pattern: '^(?!.*\\d)', minLength: 2, maxLength: 120 },
    password: { type: 'string', pattern: '', minLength: 8, maxLength: 30 }
  }
}

const app: express.Application = express()

app.use(morgan('dev'))
app.use(bp.json({ type: 'application/json' }))
app.use(bp.urlencoded({ type: 'application/x-www-form-urlencoded', extended: false }))
app.use(cors())

// session middleware
app.set('trust proxy', 1)
app.use(session({
  secret: process.env.SESSION_SECRET ? process.env.SESSION_SECRET : require('../config').config.session.secret,  
  resave: false,
  saveUninitialized: false,
  store: new (require('connect-pg-simple')(session))({
    conString: getStoreConnString()
  }),
  cookie: { maxAge: 60 * 60 * 1000, secure: true }
}))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))
}

app.post('/rsvp/register', validate(ajv.compile(register)), async function (req, res, next) {
  const data = req.body as RegisterRequest
  try {
    const emailExists = await getManager().findOne(Rsvp, { email: data.email })
    if (emailExists) {
      res.status(406).json('This email has already been registered. Please try another.')
    } else {
      const rsvp = await getManager().save(Rsvp, { ...data })
      res.status(200).json(rsvp)      
    }
  } catch (e) {
    console.error(`Error registering: ${e}`)
    next(e)
  }
  next()
})

app.get('/rsvp/all', async function (_, res, next) {
  // if (!req.session.user) {
  //   res.status(401).json('Action requires authentication.')
  // } else {
    try {
      const all = await getManager().find(Rsvp)
      res.status(200).json(all)
    } catch (e) {
      next(e)
    }
    // next()
  // }
})

app.post('/admin/register', validate(ajv.compile(login)), async function (req, res, next) {
  const { userName, password } = req.body
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) next(err)
    try {
      const newUser = await getManager().save(User, { userName, password: hash, admin: true })
      res.status(200).json(R.omit(['password', 'createdAt', 'updatedAt'], newUser))
    } catch (e) {
      next(e)
    }
  })
})

app.post('/admin/login', async function (req, res, next) {
  const { userName, password } = req.body
  const user = await getManager().findOne(User, { userName })
  if (!user) res.status(401).json('User not found.')
  const match = bcrypt.compare(password, user.password)
  if (!match) res.status(401).json('Invalid password')
  req.session.user = user.id
  res.status(200).json('Successfully logged in.')
  next()
})

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

export default app

interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  reply: boolean
}


export function validate(validator: Ajv.ValidateFunction) {
  return function (req, _, next) {
    if (validator(req.body) !== true) {
      next(JSON.stringify(validator.errors))
    } else {
      next()
    }
  }
}