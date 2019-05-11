import 'reflect-metadata'
import { createConnection } from 'typeorm'
import app from './app'
import { pgConfig } from './helpers'

const PORT = process.env.PORT || 3333

createConnection(pgConfig())
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app listening on port ${PORT}`)
    })
  })
  .catch(err => console.log(err))