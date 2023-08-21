const Sequelize = require('sequelize');
const db = require('../apis/sqConnection');
const {Model} = require("sequelize");
class Session  extends Model {}
const attributes = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Supervisor:{
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
}
const options = {modelName: 'Sessions', sequelize: db}

Session.init(attributes, options)
module.exports = Session;
