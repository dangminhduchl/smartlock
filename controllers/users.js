const { redirect } = require("express/lib/response");
const db = require("../models/users");

module.exports = {
    index: function(req, res) {
      res.render('users/index');
    },
    get_signin: function(req, res) {
       // var messages = req.flash('error')
        res.render('users/signin',{
           // messages:messages
            //hasErrors: messages.legth>0,
        })
    },
    post_signin: function(req,res1) {
        let u = req.body.username;
        let p = req.body.password;
        let sql = "select * from users where username = $1";
        db.query(sql,[u], (req,res) =>{

            console.log(res.rows)
        
            if(res.rows.size<=0)
            {
                res1.redirect("/users/signin");
                return;
            }
            let user = res.rows[0];
            //let pass_fromdb = user.password;
            if(p == user.password)
            {
                console.log("OK");
                res1.redirect("/control");
            }
            else {
                console.log("NOT OK");
                res1.redirect("/users/signin");
            }
        })
    },
    get_signup: function(req,res) {
        res.render('users/signup',{
            // messages:messages
            hasError: 0
         })
    },
    post_signup: function(req,res1) {
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
    },

    search: function(req,res){
        var name = req.query.name;

        var result = users.filter((user)=>{
            return user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
        })
        res.render('users/index',{users: result});
    },
    get_create: function(req,res){
        res.render("users/create")
    },
    post_create: function(req,res){
      users.push(req.body)
      res.redirect('/users')  
    },
    get_id: function(req,res) {
        var user = users.find((user)=>{
            var nid = req.params.id
                return user.id == parseInt(nid) 
        })
        console.log(req.params)
        res.render("users/show",{user:user})
    },

};