const router = require('express').Router()
const authGuards = require('./guards/auth.guard')
const adminController = require('../controllers/admin.controller')
const check = require('express-validator').check
const multer = require('multer')

//get Add Product
router.get('/add-product', authGuards.isAdminAuth, adminController.getAddProduct)

// post Add product
router.post('/add-product', authGuards.isAdminAuth,
    multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'images')
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + '-' + file.originalname)
            }
        })
    }).single('image'),
    check('image').custom((value,{req})=>{
        if(req.file)return true
        else throw('Image Not Found ')
    }),
    check('name').not().isEmpty().withMessage('Product name is required'),
    check('price').not().isEmpty().withMessage('The price of product is required').isInt({ min: 1 }).withMessage('price of product should be at least 1 $'),
    check('description').not().isEmpty().withMessage('Description of the product is required'),
    check('category').custom((value,{req})=>{
        if(req.body.category != '')return true
        else throw("You must select the Category")
    }),
     adminController.postAddProduct)




module.exports = router