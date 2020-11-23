function auth(req,res,next){
    
    if(req.session.userId!=undefined){
        console.log(req.session.user)
        next();
    }else{
        console.log('noo')
        console.log(req.session.user)
        res.redirect('/?erro=auth');
    }
}

module.exports=auth;