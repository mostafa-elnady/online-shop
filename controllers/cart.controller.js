const validationResult = require('express-validator').validationResult
const cartModel = require('../models/cart.model')


//get cart
exports.getCart = (req, res, next) => {

    cartModel.getItems(req.session.userID).then(items => {
        res.render('cart', {
            items: items,
            userId: req.session.userID,
            isAdmin:req.session.isAdmin,
            validationErrors:req.flash('validationErrors')[0],
            pageTitle:'Cart'
        })
    })


}

//post add item to cart
exports.postCart = (req, res, next) => {

    if (validationResult(req).isEmpty()) {

        cartModel.addNewItem(req.body.productName,{
            name: req.body.productName,
            amount: req.body.amount,
            price: req.body.price,
            productId: req.body.productId,
            userId: req.session.userID,
            timeStamp: new Date()
        }).then(() => {
            res.redirect('/cart')
        }).catch(err => {
            console.log(err)
        })


    } else {
        req.flash('validationErrors', validationResult(req).array())
        res.redirect(req.body.redirectTo)
    }


}

// update item in cart 
exports.PostEditItem = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        cartModel.editItem(req.body.item_id,{
            amount:req.body.amount,
        }).then(()=>{
            res.redirect('/cart')
        }).catch(err=>{
            console.log(err)
        })

    } else {
      
        req.flash('validationErrors', validationResult(req).array())
        res.redirect('/cart')
    }

}

// delet item
exports.postDeleteItem = (req,res,next)=>{
    cartModel.deleteItem(req.body.item_id).then(()=>{
        res.redirect('/cart')
    }).catch(err=>{
        console.log(err)
    })
}

//delete All items
exports.postDeleteAllItems = (req,res,next)=>{

    cartModel.deleteAllItems(req.body.userId).then(()=>{
        res.redirect('/cart')
    }).catch(err=>{
        console.log(err)
    })

}