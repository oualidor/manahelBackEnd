const Sequelize = require('sequelize');
const db = require('../apis/sqConnection');
const {Model} = require("sequelize");
class ClassSession  extends Model {}
const Attributes = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    classId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    day:{
        type: Sequelize.STRING,
        allowNull: false
    },
    time:{
        type: Sequelize.TIME,
        allowNull: false
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    roomId:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
}
const Options = {sequelize: db, modelName: 'ClassSessions'}
ClassSession.init(Attributes, Options)
module.exports = ClassSession;
