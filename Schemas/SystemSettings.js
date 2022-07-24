const Sequelize = require('sequelize');
const db = require('../apis/sqConnection');
//defining the model

const SystemSettings = db.define('SystemSettings', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    stat: {
        type: Sequelize.INTEGER
    },
    storesSignUp: {
        type: Sequelize.INTEGER
    },
    clientSignUp: {
        type: Sequelize.INTEGER
    },
    storesSignUpPolicy: {
        type: Sequelize.INTEGER
    },
    clientSignUpPolicy: {
        type: Sequelize.INTEGER
    },
});

module.exports = SystemSettings;