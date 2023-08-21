const Sequelize = require('sequelize');
const db = require('../apis/sqConnection');
const {Model} = require("sequelize");
class Class  extends Model {}
const ModelAttributes =  {

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
    price:{
        type: Sequelize.STRING,
    },
    teacherId: {
        type: Sequelize.INTEGER,
    },
    moduleId: {
        type: Sequelize.INTEGER,
    },
    levelId: {
        type: Sequelize.INTEGER,
    },
    typeId: {
        type: Sequelize.INTEGER,
    },
    contractId: {
        type: Sequelize.INTEGER,
    },
    managed: {
        type: Sequelize.BOOLEAN,
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
    }


};
const Options = {sequelize: db, modelName: 'Classes'}
Class.init(ModelAttributes, Options)
module.exports = Class;
