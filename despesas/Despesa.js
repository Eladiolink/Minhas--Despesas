const connection=require('../database/conection');
const Sequelize=require('sequelize');
const User=require('../user/User');

const Despesas= connection.define("despesas",{
    
    data:{
        type:Sequelize.DATEONLY,
        allowNull:false
    },
    type:{
        type:Sequelize.STRING,
        allowNull:false
    },
    estado:{
        type:Sequelize.STRING,
        defaultValue:'pendente',
        allowNull:false
    },
    descrition:{
        type:Sequelize.STRING,
        allowNull:false
    },
    value:{
        type:Sequelize.FLOAT,
        allowNull:false
    }
})

User.hasMany(Despesas); 
Despesas.belongsTo(User);

//connection.sync({force:true});
module.exports=Despesas;