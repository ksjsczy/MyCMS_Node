require('dotenv').config()
const fs = require('fs')
const path = require('path')

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'), { encoding: 'utf8' })
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'), { encoding: 'utf8' })
const {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_CONNECTION_LIMIT
} = process.env
module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_CONNECTION_LIMIT,
  PRIVATE_KEY,
  PUBLIC_KEY
}

