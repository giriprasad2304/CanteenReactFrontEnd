const express = require('express')
const authMiddleWare = require('../middleware/auth.middleware')
const profileController = require("../controllers/profile.controller")

const route = express.Router()

route.get('/profile', authMiddleWare.authenticateUser, profileController.getProfile)

module.exports = route