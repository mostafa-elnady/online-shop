const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const homeRouter = require('./routes/home.route')
const productRouter = require('./routes/product.route')
const authRouter = require('./routes/auth.route')
const cartRouter = require('./routes/cart.route')
const adminRouter = require('./routes/admin.route')
const session = require('express-session')
const { fstat } = require('fs')
const SessionStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')
const { nextTick } = require('process')

app.use(express.static(path.join(__dirname,'assets')))
app.use(express.static(path.join(__dirname,'images')))

app.use(bodyParser.urlencoded({extended:false}))


const STORE = new SessionStore({
    uri:'mongodb+srv://mostafa:mostafa_elnady@cluster0.w7zlo.mongodb.net/online-shop?retryWrites=true&w=majority',
    collection:'sessions'
})

app.use(session({
    secret:"this is my secret to incrept sessin in express js ",
    saveUninitialized:false,
    resave:false,
    store:STORE

}))

app.use(flash())



app.set('view engine','ejs')
app.set('views','views')
    

app.use('/',homeRouter)
app.use(authRouter)
app.use('/product',productRouter)
app.use('/cart',cartRouter)
app.use('/admin',adminRouter)

app.get('/error',(req,res,next)=>{
    res.render('error',{
        userId: req.session.userID,
        isAdmin:req.session.isAdmin,
        pageTitle:'Error'
    })
})

app.use((error,req,res,next)=>{
    res.redirect('/error')
})

app.use((req,res,next)=>{
    res.render('page-404',{
        userId: req.session.userID,
        isAdmin:req.session.isAdmin,
        pageTitle:'Page not found'
    })
})
const port = process.env.port || 3000
app.listen(port,(err)=>{
    console.log(err)
    console.log('server running on port 3000 ')
})