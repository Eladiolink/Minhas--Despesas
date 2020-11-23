const Express=require("express");
const App=Express();
const BodyPaser=require('body-parser');
const session=require('express-session');


//Connection Database
const connectio_database=require('./database/conection');

connectio_database.authenticate().then(()=>{
    console.log('Database on');
}).catch((erro)=>{
    console.log(erro);
})

// CONTROLLERS
const Despesas=require("./despesas/DespesasController");
const User=require('./user/userController');

App.use(Express.static('public'));

App.set('view engine',"ejs");

App.use(BodyPaser.urlencoded({extended:false}));

App.get('/',(req,res)=>{
     res.render('index');

})

// //Express-session
App.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    cookie: { maxAge: 720000000000000000000000000 }
  }))

//ROUTES
App.use('/',Despesas);
App.use('/',User);



App.listen(8000,()=>{
    console.log('Servidor de Pé');
})