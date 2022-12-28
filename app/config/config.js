require('dotenv').config()
module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DEVELOPMENT_NAME,
    host: process.env.DATABASE_HOSTNAME,
    dialect: process.env.DATABASE_DIALECT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_TEST_NAME,
    host: process.env.DATABASE_HOSTNAME,
    dialect: process.env.DATABASE_DIALECT
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_PRODUCTION_NAME,
    host: process.env.DATABASE_HOSTNAME,
    dialect: process.env.DATABASE_DIALECT
  }
}
