import express from 'express';
import * as control_controller from '../controllers/control.js'
const control_router = express.Router();

control_router.get('/', control_controller.index)
export default control_router;