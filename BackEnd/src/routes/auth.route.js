const express = require('express');
const authcontroller = require('../controllers/auth.controller')

const route = express.Router();

route.post('/signup', authcontroller.signup)
route.post('/login', authcontroller.login)
route.post('/logout', authcontroller.logout)

module.exports = route;