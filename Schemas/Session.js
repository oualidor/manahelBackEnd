const Sequelize = require('sequelize');
const db = require('../apis/sqConnection');


const Session = db.define('Sessions', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    SuperViser:{
        type: Sequelize.STRING,
        allowNull: false
    },
    type:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    classId: {
        type: Sequelize.INTEGER,
    },
    duration: {
        type: Sequelize.INTEGER,
    },
    saleId:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

db.sync();
module.exports = Session;
