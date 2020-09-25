
const homeModel = require('../models/products.model')


//get Home
exports.getHome = (req, res, next) => {
    
    console.log(req.session.userID)


    //get all products from db
    //get products category
    //check if category && category!= all 
    //filter get product of a specific category
    //else render all

    let category = req.query.category
    let validCategories = ['Taplets','phones','clothes','test']
    let productsPromise
    if ( category && validCategories.includes(category))productsPromise= homeModel.getProductOfCategory(category)
    else productsPromise = homeModel.getAllProducts()

    productsPromise.then(products=>{
        res.render('index',{
            products:products,
            category:category,
            userId:req.session.userID,
            isAdmin:req.session.isAdmin,
            validationErrors:req.flash('validationErrors')[0],
            pageTitle:'Home'

        })
    })

}

