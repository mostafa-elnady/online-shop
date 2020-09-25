const router = require('express').Router()
const authGuard = require('./guards/auth.guard')
const check = require('express-validator').check
const cartController = require('../controllers/cart.controller')

//get cart
router.get('/', authGuard.isAuth, cartController.getCart)
//post add item to cart
router.post('/', authGuard.isAuth,
    check('amount').not().isEmpty().withMessage(' amount is required ')
        .isInt({ min: 1 }).withMessage("amount should be at least 1 item"),
    cartController.postCart

)

// update item
router.post('/update', authGuard.isAuth
    , check('amount').not().isEmpty().withMessage(' amount is required ')
        .isInt({ min: 1 }).withMessage("amount should be at least 1 item"),
    cartController.PostEditItem)

//delete item
router.post('/delete',authGuard.isAuth,cartController.postDeleteItem)

//Delete All items
router.post('/deleteAll',authGuard.isAuth,cartController.postDeleteAllItems)



module.exports = router