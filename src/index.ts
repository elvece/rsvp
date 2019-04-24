import 'reflect-metadata'
import { createConnection } from 'typeorm'
import app from './app'
import { config } from '../config'

const PORT = process.env.PORT || 3333

createConnection(config.database)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app listening on port ${PORT}`)
    })
  })
  .catch(err => console.log(err))