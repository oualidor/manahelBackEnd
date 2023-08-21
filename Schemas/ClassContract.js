const Sequelize = require('sequelize');
const db = require('../apis/sqConnection');



const ClassContract = db.define('ClassContracts', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    rate: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});


module.exports = ClassContract;
