const Sequelize = require('sequelize');
const db = require('../apis/sqConnection');
const Teacher = db.define('Teachers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mail: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    hashedPassword: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    sexe: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    level: {
        type: Sequelize.STRING(30),
    },
    image: {
        type: Sequelize.STRING
    },
    valid:{
        type: Sequelize.INTEGER
    },
});



module.exports = Teacher;
