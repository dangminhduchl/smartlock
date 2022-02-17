import express from 'express';
import * as controll from '../controllers/control.js'

const control_router = express.Router();

control_router.get('/', controll.index)
export default control_router;