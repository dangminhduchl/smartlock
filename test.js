import pg from 'pg'
import config from './config.js'
const Pool = pg.Pool
const db = new Pool(config.POSTGRES_INFO)

let sql = "select * from users";
db.query(sql, (req,res) =>{

    console.log(res)
})