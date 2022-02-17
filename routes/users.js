import express from 'express';
import * as user_controller from '../controllers/users.js'
import {checkAdmin, checkAuth} from '../utils.js'
const user_router = express.Router();
user_router.get('/controll',checkAuth, user_controller.index)
user_router.get('/allusers',checkAdmin, user_controller.showusers)
user_router.post('/allusers',checkAdmin, user_controller.post_showusers)
user_router.get('/signin',user_controller.get_signin)
user_router.post('/signin',user_controller.post_signin)
user_router.get('/signup',user_controller.get_signup)
user_router.post('/signup',user_controller.post_signup)
user_router.get('/:id/edit',checkAdmin, user_controller.get_updateUser)
user_router.post('/:id/edit',checkAdmin, user_controller.post_updateUser)
user_router.get('/:id/delete',checkAdmin, user_controller.deleteUser)
user_router.post('/create',checkAdmin, user_controller.post_create)
user_router.get('/create',checkAdmin, user_controller.get_create)
user_router.post('/logout',user_controller.post_logout)

// user_router.get('/')
export default user_router;