import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'

const app: express.Application = express()
const router: express.Router = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use('/', router)

export default app