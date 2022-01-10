import express from 'express'
import pg from 'pg'
import config from '../config.js'
import { getToken } from '../utils.js'
const router = express.Router()

const Pool = pg.Pool
const db = new Pool(config.POSTGRES_INFO)

export const index = (req, res)=> {
    res.render('users/index');
}
export const get_signin = (req, res)=> {
    // var messages = req.flash('error')
    res.render('users/signin',{
        // messages:messages
        //hasErrors: messages.legth>0,
    })
}
export const post_signin = async(req,res1)=> {
    let u = req.body.username;
    let p = req.body.password;
    if(u == ''||p == '')
        res1.status(500).send({message: 'Missing some value'})
    else{
        try{
            var user = await db.query('SELECT * FROM USERS WHERE username = $1 and password = $2 LIMIT 1',[u,p])
        } catch(err){
            console.log(err.stack)
        }
        if(user.rowCount)
        {
            var token = getToken(user)
            res1.cookie('token',token,{expires: new Date(Date.now()+90000000)})
            res1.send({
                id: user.rows[0].id,
                username : user.rows[0].username,
                role : user.rows[0].role,
               // token : token

            })
        }
        else {
            res.status(500).send({message:'Wrong username or password'});
        }


    }
    
}
export const get_signup = function(req,res) {
    res.render('users/signup',{
        // messages:messages
        hasError: 0
        })
}
export const post_signup = function(req,res1) {
    let u = req.body.username;
    let p = req.body.password;
    console.log(req.body);
    let user_info=[u,p];
    let sqlcheck = "select * from users where username = $1";
    db.query(sqlcheck,[u], (req,res) =>{
        if(res.rows.length>0)
        {
            
            console.log("username da ton tai");
            res1.render('users/signup',{hasError : 1,msg:'user name da ton tai'});   
        }
        else {

            let sql = 'INSERT INTO USERS(username, password) VALUES($1,$2)';
            db.query(sql,user_info);
            res1.redirect("/users/signin");
        }
    });
}

export const search = function(req,res){
    var name = req.query.name;

    var result = users.filter((user)=>{
        return user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    })
    res.render('users/index',{users: result});
}
export const get_create = function(req,res){
    res.render("users/create")
}
export const post_create = function(req,res){
    users.push(req.body)
    res.redirect('/users')  
}
export const get_id = function(req,res) {
    var user = users.find((user)=>{
        var nid = req.params.id
            return user.id == parseInt(nid) 
    })
    console.log(req.params)
    res.render("users/show",{user:user})
}

export default router;