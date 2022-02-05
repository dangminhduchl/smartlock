import express from 'express'
import { getToken, getUser } from '../utils.js';
//import authuser from './users.js'
const router = express.Router()
export const index = async (req,res) => {
        const check = await getUser(req, res)
        if(check)
        {
                res.render('homepages/home');
                
        }
        else {   
                res.redirect('/users/signin')
        }
}
export default router
