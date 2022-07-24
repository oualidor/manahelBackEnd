const Sequelize = require('sequelize');
const db = require('../apis/sqConnection');
//defining the model

const StoreSetting = db.define('Settings', {
    storeId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    remoteCommand: {
        type: Sequelize.INTEGER
    },
    delivery: {
        type: Sequelize.INTEGER
    },
    outWilayaDelivery: {
        type: Sequelize.INTEGER
    },
    openTime:{
        type: Sequelize.STRING(20)
    },
    closeTime:{
        type: Sequelize.STRING(20)
    }
});

module.exports = StoreSetting;