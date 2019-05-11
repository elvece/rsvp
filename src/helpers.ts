import * as pgParser from 'pg-connection-string'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import * as fs from 'fs'
import * as R from 'ramda'

export function pgConfig() {
  if (process.env.NODE_ENV === 'development') {
    const c = require('../config')
    if (!c.config) throw new Error('config file required in development mode')
    return c.config.database
  } else {
    const databaseUrl: string = process.env.DATABASE_URL
    const connOpts = pgParser.parse(databaseUrl)
    const typeOrmOptions: PostgresConnectionOptions = {
      type: 'postgres',
      host: connOpts.host,
      port: connOpts.port,
      username: connOpts.username,
      password: connOpts.password,
      database: connOpts.database,
      entities: ['./src/models/index.js'],
      migrations: ['./migrations/*.js'],
      migrationsTableName: 'db_migrations',
      migrationsRun: false,
      logging: false,
      ssl: true
    }
    const ormConfigExtra = {
      cli: {
        migrationsDir: 'migrations'
      },
      extra: {
        max: 20
      },
      logging: true
    }
    genOrmConfigJson(R.merge(R.omit(['migrationsRun'], typeOrmOptions), ormConfigExtra))
    console.log(typeOrmOptions)
    return typeOrmOptions
  }
}

export function getStoreConnString() {
  const config = pgConfig()
  return process.env.NODE_ENV === 'development' ? 'postgres://' + config.username + ':' + config.password + '@' + config.host + '/' + config.database : process.env.DATABASE_URL
}

function genOrmConfigJson(opts: PostgresConnectionOptions) {
  const json = JSON.stringify(opts, null, 2)
  fs.writeFile('ormconfig.json', json, (err) => {
    if (err) {
      console.error(`ERR GEN ORM CONFIG: ${err}`)
      return
    }
    console.log('File has been created')
  })
}