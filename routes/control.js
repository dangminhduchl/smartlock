const express = require('express');
const user_router = express.Router();
const user_controller = require('../controllers/control')

user_router.get('/', user_controller.index)
module.exports = user_router;