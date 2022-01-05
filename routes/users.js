const express = require('express');
const user_router = express.Router();
const user_controller = require('../controllers/users')

user_router.get('/', user_controller.index)
user_router.get('/userid:id', user_controller.get_id)

user_router.get('/search',user_controller.search)
user_router.get('/create',user_controller.get_create)
user_router.post('/create',user_controller.post_create)
user_router.get('/signin',user_controller.get_signin)
user_router.post('/signin',user_controller.post_signin)
user_router.get('/signup',user_controller.get_signup)
user_router.post('/signup',user_controller.post_signup)
module.exports = user_router;