import express from 'express'
import pg from 'pg'
import config from '../config.js'
import { getToken } from '../utils.js'
import users from '../models/users.js'
const router = express.Router()

const Pool = pg.Pool
const db = new Pool(config.POSTGRES_INFO)

export const index = (req, res)=> {
    res.render('users/index');
}
export const get_signin = (req, res)=> {
    // var messages = req.flash('error')
    res.render('users/signin',{hasError :0
        // messages:messages
        //hasErrors: messages.legth>0,
    })
}
export const post_signin = async(req,res1)=> {
    let u = req.body.username;
    let p = req.body.password;
    if(u == ''||p == '')
        res1.status(500).render('users/signin',{hasError: 1,msg: 'Missing some value'})
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
            let authuser = new users(user.rows[0].id, user.rows[0].username,user.rows[0].password,user.rows[0].role,token)
            console.log(user.rows[0])
            console.log(authuser)
            if(authuser.role > 0){
                res1.render('controll/home')
            }
            else{
                res1.render('users/signin',{hasError:1,msg:'Admin chua cap quyen, hay lien he voi admin'})
            }
        }
        else {
            res1.status(500).render('users/signin',{hasError:1 ,msg:'Wrong username or password'});
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
            res1.status(500).render('users/signup',{hasError : 1,msg:'user name da ton tai'});   
        }
        else {

            let sql = 'INSERT INTO USERS(username, password) VALUES($1,$2)';
            db.query(sql,user_info);
            res1.redirect("/users/signin");
        }
    });
}



export const showusers = async (req,res) => {
    try{
        var alluser = await db.query('SELECT * FROM USERS')
        array.forEach(element => {
            
        });
        console.log(alluser.rows)
    } catch(err){
        console.log(err)
        }
        res.render("users/user",{user:alluser.rows})
}
export const post_showusers = async (req,res) => {

    console.log(req.body)
    let id = req.body.ID
    let role = req.body.setrole
    console.log(id,role)
    try {
        db.query('UPDATE USERS SET role = $1 WHERE id = $2',[role,id])
    } catch(err){
        console.log(err);
    }
    res.redirect('/users/allusers')
}

export default router;