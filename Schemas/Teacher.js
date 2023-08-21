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
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    sex: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    level: {
        type: Sequelize.STRING(30),
    },
    image: {
        type: Sequelize.STRING
    },
    stat:{
        type: Sequelize.INTEGER
    },
});

db.sync()



module.exports = Teacher;
