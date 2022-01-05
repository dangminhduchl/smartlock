const {Pool} = require('pg')
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'smartLock',
  password: '3101',
  port: 5432,
})
/*let user_info=['nam','123'];
let sql = 'INSERT INTO USERS(username, password) VALUES($1,$2)';
db.query(sql,user_info);
db.query('SELECT * FROM users',(req,res)=>{
    console.log(res.rows);
});*/
/*let sql = "select * from users where username = 'admin'";
db.query(sql, (req,res) =>{
  console.log(res)
        })*/
module.exports = db; //lệnh exports để xuất (public) ra, cho bên ngoài module có thể dùng được db

