const Express=require('express');
const Route=Express.Router();
const auth=require('../midleware/auth');

//Modal
const Despesas=require('./Despesa');

Route.get('/createDespesa', auth ,(req,res)=>{
    res.render('despesas/create_despesa');
})

Route.get(('/despesas'),auth ,(req,res)=>{
    let user=req.session.userId
    console.log("============ ID ============");
    console.log(user);

    Despesas.findAll({where:{userId:user,estado:'pendente'}}).then((despesas)=>{
        res.render('despesas/despesas',{despesas});
    }).catch((erro)=>{
        console.log('Erro: '+erro)
        res.redirect('/')
    })
   
})

Route.get('/edit/:id',auth ,(req,res)=>{
     let id=req.params.id;

     Despesas.findByPk(id).then((despesa)=>{
         res.render('despesas/edit',{despesa,id});
     }).catch((erro)=>{
        console.log(erro);
         res.redirect("/");
     })
})

Route.post('/save',auth ,(req,res)=>{
    let time=req.body.time,
        type=req.body.type,
        descrition=req.body.descrition,
        value=req.body.value;
        value=parseFloat(value),
        user=req.session.userId
    if(time!="" && type!="" && descrition!="" && value!="" && isNaN(type)){ 
       Despesas.create(
           {
               data:time,
               type:type,
               descrition:descrition,
               value:value,
               userId:user
           }
       ).then((()=>{
              res.redirect('/despesas');
       })).catch((erro)=>{
           console.log(erro)
         res.redirect("/createDespesa?erro")
       })
   
   }else{
       res.redirect("/createDespesa?erro=notValues")
   }
  
})

Route.post('/update',auth ,(req,res)=>{
    let time=req.body.time,
        type=req.body.type,
        descrition=req.body.descrition,
        value=req.body.value,
        id=req.body.id;
        value=parseFloat(value);
        if(time!="" && type!="" && descrition!="" && value!="" && isNaN(type)){
     Despesas.update({
       data:time,
       type,
       descrition,
       value
     },{where:{id}}).then(()=>{
         res.redirect('/despesas');
     }).catch((erro)=>{
        console.log(erro)
        res.redirect('/despesas?erro');
     })
        }else{
            res.redirect(`/edit/${id}?erro=notValue`)
        }
  
})

Route.post('/trash',auth ,(req,res)=>{
    let id=req.body.id

    Despesas.destroy({where:{id}}).then(()=>{
        res.redirect('/despesas')
    }).catch((erro)=>{
       console.log('ERRO: '+erro)
       res.redirect('/despesas?erro')
    })
})

Route.get('/finalizado/:id',auth,(req,res)=>{
      let id=req.params.id;
      Despesas.update({estado:'finalizado'},{where:{id}}).then(()=>{
         res.redirect('/despesas');
      }).catch((erro)=>{
          console.log(erro);
      });
});

Route.get(('/finalizadas'),auth ,(req,res)=>{
    let user=req.session.userId
    console.log("============ ID ============");
    console.log(user);

    Despesas.findAll({where:{userId:user,estado:'finalizado'}}).then((despesas)=>{
        res.render('despesas/finalizadas',{despesas});
    }).catch((erro)=>{
        console.log('Erro: '+erro)
        res.redirect('/')
    })
   
})

module.exports=Route;