const { resolveInclude } = require('ejs');
const mongoose = require('mongoose')
const DB_URL = 'mongodb+srv://mostafa:mostafa_elnady@cluster0.w7zlo.mongodb.net/online-shop?retryWrites=true&w=majority';

const cartScema = {
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timeStamp: Number
}

const CartItem = mongoose.model('cart', cartScema);

// get cart items
exports.getItems = (userID) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
            return CartItem.find({ userId: userID }, {}, { sort: { timeStamp: 1 } })
        }).then(items => {
            mongoose.disconnect()
            resolve(items)
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        })
    })
}

//add new Item to cart
exports.addNewItem = (name, data) => {

    return new Promise((resolve, reject) => {

        mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {

            // console.log(CartItem.findOne({name:name}))

            CartItem.findOne({ name: name }).then(item => {
                if (item == null) return new CartItem(data).save()
                else return CartItem.updateOne({ name: name }, data)

            }).then(() => {
                mongoose.disconnect()
                resolve()
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })

        })
    })

}

// edit item
exports.editItem = (item_id, newData) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
            return CartItem.updateOne({ _id: item_id }, newData)
        }).then(() => {
            mongoose.disconnect();
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

//delete item from cart
exports.deleteItem = (item_id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
            return CartItem.findOneAndDelete(item_id)
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })

    })
}

//delete All Items from cart
exports.deleteAllItems = (userId)=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true }).then(()=>{
           return CartItem.deleteMany({userId:userId})
        }).then(()=>{
            mongoose.disconnect()
            resolve()

        }).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })



    })
    
}