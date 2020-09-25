const router = require('express').Router()
const homeController = require('../controllers/home.controller')
const authGuards = require('./guards/auth.guard')

// home
router.get('/',homeController.getHome)




module.exports = router