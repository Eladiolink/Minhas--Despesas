const Express=require('express');
const App=new Express;
const nodemon = require('nodemon');
const Router=Express.Router();
const User=require('./User');
const bcrypt=require('bcryptjs');
const session=require('express-session');


Router.get('/singUp',(req,res)=>{
    res.render('user/singUp');
})

Router.get('/login',(req,res)=>{
    res.render('user/login');
})

Router.post('/singup',(req,res)=>{ 
       let nome= req.body.nome,
           user= req.body.user,
           email= req.body.email,
           senha= req.body.password
           
           if(nome!="" && email!="" && senha!="" && user!=""){
           
            const salt=bcrypt.genSaltSync(10);
            var hash=bcrypt.hashSync(senha,salt);
            
            User.create({nome:nome,email:email,password:hash,user}).then((user)=>{
                req.session.userId=user.id
                res.redirect('/despesas');
            }).catch((erro)=>{
               console.log(erro);
               res.redirect('/singUp/?erro=cadastro');
            })
           }else{
               res.redirect('/singUp/?erro=valuesNull');
           }
})

Router.post('/login',(req,res)=>{ 
    let email= req.body.email,
    password= req.body.password
    
        if(email!="" && password!=""){

         User.findOne({where:{email}}).then((user)=>{
             if(bcrypt.compareSync(password,user.password)){
                req.session.userId=user.id
                console.log("============ ID ============");
                console.log(req.session.userId);
                res.redirect('/despesas');
             }else{
                res.redirect('/login');
             }
            
         }).catch((erro)=>{
            console.log(erro);
            res.redirect('/login/?erro=cadastroNotfound');
         })
        }else{
            res.redirect('/login');
        }
})

Router.get('/logoff',(req,res)=>{ 
     req.session.userId=null;
     res.redirect('/') ;
})

module.exports=Router;