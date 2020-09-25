const validationResult = require('express-validator').validationResult
const productModel = require('../models/products.model')
//get Add product
exports.getAddProduct = (req, res, next) => {

    res.render('add-product', {
        userId: true,
        isAdmin: true,
        validationErrors: req.flash('validationErrors'),
        pageTitle: 'Add Product'
    })

}
// post Add product
exports.postAddProduct = (req, res, next) => {

    if (validationResult(req).isEmpty()) {

        productModel.addProduct({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            image: req.file.filename
        }).then(() => {
            res.redirect('/')
        }).catch(err => {
            next(err)
        })

    } else {
        req.flash('validationErrors', validationResult(req).array())
        res.redirect('/admin/add-product')
    }
}
