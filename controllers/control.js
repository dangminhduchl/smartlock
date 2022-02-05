import express from 'express'
import { getToken } from '../utils.js';
import authuser from './users.js'
const router = express.Router()
export const index = function(req,res) {
        if(authuser.role)
        {
                res.render('controll/home');

        }
        else {
                res.status(500).redirect('users/signin',{hasError: 1,msg:'Ban khong co quyen truy cap'})
        }
}
export default router
