const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const { use } = require('../routes/auth.route');
const DB_URL = 'mongodb+srv://mostafa:mostafa_elnady@cluster0.w7zlo.mongodb.net/online-shop?retryWrites=true&w=majority';

const userScema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin:{
        type:Boolean,
        default:false
    }
})

const User = mongoose.model('user', userScema)

//create new user
exports.createNewAccount = (username, email, password) => {

    //check if email exist in DB
    // if exist show messeage that email exist
    //if not exist save data in DB

    return new Promise((resolve, reject) => {

        mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
            return User.findOne({ email: email })
        }).then(user => {
            if (user) {
                mongoose.disconnect()
                reject('Email is exist')
            } else {

                return bcrypt.hash(password, 10)

            }
        }).then(passwordHash => {
            let user = new User({
                username: username,
                password: passwordHash,
                email: email
            })

            return user.save()
        }).then(() => {
            mongoose.disconnect()
            resolve('Email created')
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })




    })



}

// login
exports.postLogin = (email, password) => {

    return new Promise((resolve, reject) => {

        mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {

            return User.findOne({
                email: email
            })

        }).then(user => {
            if (!user) {
                mongoose.disconnect();
                reject('sorry there is no user with this email address ');
            } else {
                return bcrypt.compare(password, user.password).then(same => {
                    if (!same) {
                        mongoose.disconnect();
                        reject(' sorry Paasword DoesNot match chect if it correct! ');
                    } else {
                        mongoose.disconnect();
                        resolve({
                            id:user._id,
                            isAdmin:user.isAdmin
                        })


                    }
                })
            }
        }).catch(err=>{
            mongoose.disconnect();
            reject(err)
        })



    })




}
