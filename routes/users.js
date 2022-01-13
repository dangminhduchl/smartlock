import express from 'express';
import * as user_controller from '../controllers/users.js'
const user_router = express.Router();
user_router.get('/', user_controller.index)
user_router.get('/allusers',user_controller.showusers)
user_router.post('/allusers',user_controller.post_showusers)
user_router.get('/signin',user_controller.get_signin)
user_router.post('/signin',user_controller.post_signin)
user_router.get('/signup',user_controller.get_signup)
user_router.post('/signup',user_controller.post_signup)

export default user_router;