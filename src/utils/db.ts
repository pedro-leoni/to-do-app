const { Pool } = require('pg')
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env


let conn: any;

if(!conn){
    conn = new Pool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      port: DB_PORT,
      database: DB_NAME
    })
}

export { conn };