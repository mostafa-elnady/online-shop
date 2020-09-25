const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const check = require('express-validator').check
const authGuard = require('./guards/auth.guard')

//get signup
router.get('/signup', authGuard.isNotAuth ,authController.getSingup)

//post signUp
router.post('/signup',authGuard.isNotAuth,
    check('username').not().isEmpty().withMessage('userName is Required'),
    check('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage('ivalid email format'),
    check('password').not().isEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage("password should be at least 6 characters "),
    check('confirmPassworfd').custom((value, { req }) => {
        if (value === req.body.password) return true
        else throw 'Pswords does not match'
    }),
    authController.postSignup)

//get login
router.get('/login',authGuard.isNotAuth ,authController.getLogin)

//post login
router.post('/login',authGuard.isNotAuth,
check('email').not().isEmpty().withMessage('Email is requird ').isEmail().withMessage('ivalid Email format'),
check('password').not().isEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage("password should be at least 6 characters "),
authController.postLogin)

// logout
router.all('/logout',authGuard.isAuth ,authController.logout)


module.exports = router 