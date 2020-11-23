const Sequelize=require('sequelize');

const sequelize=new Sequelize('db_despesas','root','kali339',{
    host:'localhost',
    dialect:'mysql'
})

module.exports=sequelize;