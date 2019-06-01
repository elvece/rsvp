import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

export const config: Config = {
  database: {
    type: 'postgres',
    host: 'localhost',
    database: 'rsvp',
    username: '',
    password: '',
    logging: false,
    entities: ['./src/models/**/*.js'],
    migrations: ['./migrations/*.js'],
    migrationsTableName: 'db_migrations',
    migrationsRun: false
  },
  session: {
    secret: ''
  }
}

interface Config {
  database: PostgresConnectionOptions
  session: {
    secret: string
  }
}