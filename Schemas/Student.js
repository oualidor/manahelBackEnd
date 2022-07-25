const Sequelize = require('sequelize');
const db = require('../apis/sqConnection');



const Student = db.define('Students', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    mail: {
        type: Sequelize.STRING,
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true
    },
    birthDate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    sex: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    facebook:{
        type: Sequelize.STRING(30),
    },
    image:{
        type: Sequelize.STRING
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
    parentId:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
});



module.exports = Student;
