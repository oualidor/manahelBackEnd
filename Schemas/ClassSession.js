const Teacher = require( "./Teacher");
const Module = require( "./Module");
const Level = require( "./Level");
const ClassType = require( "./ClassType");

const Sequelize = require('sequelize');


const db = require('../apis/sqConnection');



const ClassSession = db.define('ClassSessions', {
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
});

db.sync()


module.exports = ClassSession;
