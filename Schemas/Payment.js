const Sequelize = require('sequelize');
const db = require('../apis/sqConnection');
const Student = require("./Student");
const Class = require("./Class");
const PaymentMetaData = require("./PaymentMetaData");


const Payment = db.define('Payments', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    amount: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});


/*
Payments.belongsTo(Class, {
    foreignKey: {
        name: 'classId'
    }
});*/


module.exports = Payment;