import express from 'express'
const router = express.Router()
export const index = function(req,res) {
        res.render('homepages/home');
}
export default router
