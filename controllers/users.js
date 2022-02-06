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
export const get_signin = async (req, res) => {
    //console.log(req.headers.cookie)
    // if(req.headers.cookie != null) res.status(500).redirect('/users/logout') 
    // else
     res.render('users/signin',{hasError :0
    })
}
export const post_signin = async(req,res1)=> {
    let u = req.body.username;
    let p = req.body.password;
    if(u == ''||p == '')
        res1.status(500).render('users/signin',{hasError: 1,msg: 'Missing some value'})
    else{
        try{
            var user = await db.query('SELECT * FROM USERS WHERE username = $1 and password = $2',[u,p])
        } catch(err){
            console.log(err.stack)
        }
        if(user.rowCount)
        {
            var token = getToken(user)
            res1.cookie('token',token,{expires: new Date(Date.now()+90000000)})
            let authuser = new users(user.rows[0].id, user.rows[0].username,user.rows[0].password,user.rows[0].role,token)
            if(authuser.role > 0){
                var isAdmin = authuser.role == 2? true: false 
                res1.render('controll/home', {isAdmin: isAdmin})
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
    let username = req.body.username
    let role = req.body.setrole
    console.log(username,role)
    try {
        await db.query('UPDATE USERS SET role = $1 WHERE username = $2',[role,username])
    } catch(err){
        console.log(err);
    }
    res.redirect('/users/allusers')
}
export const deleteUser = async (req, res) => {
    const {id} = req.params.id
    const del = await db.query("DELETE FROM USERS WHERE id = $1", [id])
    res.redirect('/users/allusers')
}

export const get_updateUser = async (req, res) => {
    const id = req.params.id
    var user = await db.query('SELECT * FROM USERS WHERE id=$1 LIMIT 1',[id])
    user= user.rows[0]
    res.render('users/editUsers', {username: user.username, role: user.role, password: user.password, id: user.id})
}

export const post_updateUser = async (req, res) => {
    const {username, password} = req.body
    const id = req.params.id
    const update = await db.query("UPDATE USERS SET username = $1, password = $2 WHERE id = $3", [username, password, id])
    res.redirect('/users/allusers')
}

export const get_logout = async(req, res) => {
    res.render('users/logout')
}
export const post_logout = async(req, res) => {
    res.clearCookie('token')
    res.status(200).redirect('/users/signin')
}
export default router;