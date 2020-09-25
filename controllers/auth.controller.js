const authModel = require('../models/auth.model')
const validationResult = require('express-validator').validationResult


//get sign up 
exports.getSingup=(req,res,next)=>{
    res.render('signup',{
        userId:req.session.userID,
        isAdmin:req.session.isAdmin,
        FlashError:req.flash('loginError')[0],
        validationErrors:req.flash('validationErrors'),
        pageTitle:'Sign Up'
    })
}
//post signup
exports.postSignup=(req,res,next)=>{

   if(validationResult(req).isEmpty()){
    authModel.createNewAccount(req.body.username,req.body.email,req.body.password).then(()=>{
        res.redirect('/login')
    }).catch(()=>{
        res.redirect('/signup')
    })

   }else{
       req.flash('validationErrors',validationResult(req).array())
       res.redirect('/signup')
   }

     
}

// get login
exports.getLogin= (req,res,next)=>{

    res.render('login',{
        userId:req.session.userID,
        isAdmin:req.session.isAdmin,
        FlashError:req.flash('loginError')[0],
        validationErrors:req.flash('validationErrors'),
        pageTitle:'Login'
    })
}

// post login
exports.postLogin=(req,res,next)=>{

if(validationResult(req).isEmpty()){

    authModel.postLogin(req.body.email,req.body.password).then(result=>{
        req.session.userID = result.id,
        req.session.isAdmin = result.isAdmin
        res.redirect('/')
    }).catch((err)=>{
        req.flash('loginError',err);
        console.log(err)
        res.redirect('/login')

    })
   
}else{
    req.flash('validationErrors',validationResult(req).array())
    res.redirect('/login')
}

   

}

//logout
exports.logout=(req,res,next)=>{

    req.session.destroy(()=>{
        res.redirect('/')
    })

    
}