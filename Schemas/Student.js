const Sequelize = require('sequelize');
const db = require('../apis/sqConnection');



const Student = db.define('Students', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true
    },
    birthDate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    sexe: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    messenger: {
        type: Sequelize.STRING(30),
    },
    image: {
        type: Sequelize.STRING
    },
    address:{
        type: Sequelize.STRING(200),
    },
    x:{
        type: Sequelize.DOUBLE
    },
    y:{
        type: Sequelize.DOUBLE
    },
    stat:{
        type: Sequelize.INTEGER
    },
    parentName:{
        type: Sequelize.STRING(30)
    },
    parentPhone:{
        type: Sequelize.STRING(30)
    },
    parentRelation:{
        type: Sequelize.STRING(30)
    },
});



module.exports = Student;