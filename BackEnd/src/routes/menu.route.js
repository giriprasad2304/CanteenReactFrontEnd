const express = require("express")
const menuController = require("../controllers/menu.controller")

const route = express.Router()

route.get('/get-menu', menuController.getItems)

module.exports = route
