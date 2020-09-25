exports.isAuth = (req,res,next)=>{
    if(req.session.userID)next()
    else res.redirect('/login')
}

exports.isNotAuth = (req,res,next)=>{
    if(!req.session.userID)next()
    else res.redirect('/')
}

exports.isAdminAuth = (req,res,next)=>{
    if(req.session.isAdmin)next()
    else{
        console.log('not Admin')
        res.redirect('/')
    }
}