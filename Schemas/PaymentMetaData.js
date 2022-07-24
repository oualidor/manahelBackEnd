const Sequelize = require('sequelize');
const db = require('../apis/sqConnection');
const Student = require("./Student");
const Class = require("./Class");
const Payment = require("./Payment");



const PaymentMetaData = db.define('PaymentMeta', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    paymentId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    dataTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dataValue: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


db.sync();
module.exports = PaymentMetaData;
