const Teacher = require( "./Teacher");
const Module = require( "./Module");
const Level = require( "./Level");
const ClassType = require( "./ClassType");
const ClassContract = require( "./ClassContract");

const Sequelize = require('sequelize');


const db = require('../apis/sqConnection');



const Class = db.define('Classes', {
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


});

Class.belongsTo(Teacher, {
    foreignKey: {
        name: 'teacherId'
    }
});
Class.belongsTo(Module, {foreignKey: {name: 'moduleId'}});
Class.belongsTo(Level, {foreignKey: {name: 'levelId'}});

Class.belongsTo(ClassType, {foreignKey: {name: 'typeId'}});
Class.belongsTo(ClassContract, {foreignKey: {name: 'contractId'}});


db.sync()


module.exports = Class;
