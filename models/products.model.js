const mongoose = require('mongoose')

const DB_URL = 'mongodb+srv://mostafa:mostafa_elnady@cluster0.w7zlo.mongodb.net/online-shop?retryWrites=true&w=majority';

const productScema = {
    name: String,
    price: Number,
    image: String,
    category: String,
    description: String
}
const Product = mongoose.model('product', productScema)

exports.getAllProducts = () => {

    //connect to dataBase
    //get products
    //disconnect
return new Promise((resolve,reject)=>{

    mongoose.connect(DB_URL,{ useUnifiedTopology: true,useNewUrlParser: true }).then(()=>{
        return Product.find({})
    }).then(products=>{
      //  console.log(products)
        mongoose.disconnect()
        resolve(products)
    }).catch(err=>reject(err))

    
})

}

// get all products Category
exports.getProductOfCategory = (category)=>{
    return new Promise((resolve,reject)=>{

        mongoose.connect(DB_URL,{ useUnifiedTopology: true,useNewUrlParser: true }).then(()=>{
            return Product.find({category:category})
        }).then(products=>{
            mongoose.disconnect()
            resolve(products)
        }).catch(err=>reject(err))
    })


}

// get product by id
exports.getProductByID = (id)=>{

    return new Promise((resolve,reject)=>{
        
        mongoose.connect(DB_URL,{ useUnifiedTopology: true,useNewUrlParser: true }).then(()=>{
            return Product.findById(id)
        }).then(product=>{
            mongoose.disconnect()
            resolve(product)
        }).catch(err=>reject(err))
    })




}

//get first product
exports.getFirstProduct=()=>{
    return new Promise((resolve,reject)=>{
        
        mongoose.connect(DB_URL,{ useUnifiedTopology: true,useNewUrlParser: true }).then(()=>{
            return Product.findOne({})
        }).then(product=>{
            mongoose.disconnect()
            resolve(product)
        }).catch(err=>reject(err))
    })

}

// add product 
exports.addProduct = (data)=>{
    return new Promise((resolve,reject)=>{

        mongoose.connect(DB_URL,{ useUnifiedTopology: true,useNewUrlParser: true }).then(()=>{
            return new Product(data).save()
        }).then(()=>{
            mongoose.disconnect()
            resolve()
        }).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}
