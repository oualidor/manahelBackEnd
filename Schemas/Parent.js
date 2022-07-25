const Sequelize = require('sequelize');
const db = require('../apis/sqConnection');



const Parent = db.define('Parents', {
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
        type: Sequelize.STRING(30),
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true
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
});



module.exports = Parent;
