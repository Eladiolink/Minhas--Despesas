const Sequelize=require('sequelize');
const connection=require('../database/conection');

const User= connection.define("user",{
    nome:{
        type:Sequelize.STRING,
        allowNull:false
    },
    user:{
        type:Sequelize.STRING,
        allowNull:false
     },
     email:{
        type:Sequelize.STRING,
        allowNull:false
     },
     password:{
        type:Sequelize.STRING,
        allowNull:false
     }    
})

//connection.sync({force:true});
module.exports=User;