const productModel = require('../models/products.model')

//get first product
exports.getProduct =(req,res,next)=>{
productModel.getFirstProduct().then((product)=>{
    res.render('product',{
        product:product,
        userId:req.session.userID,
        isAdmin:req.session.isAdmin,
        pageTitle:'Product'
    })
})
}
//get product by id 
exports.getProductByID = (req,res,next)=>{
//id
// find product by id
//render
let id = req.params.id
productModel.getProductByID(id).then(product=>{
    console.log(product)
    res.render('product',{
        product:product,
        userId:req.session.userID,
        isAdmin:req.session.isAdmin,
        pageTitle:'Product'
    })
})



}


