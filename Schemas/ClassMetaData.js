const Sequelize = require('sequelize');
const db = require('../apis/sqConnection');


const ClassMetaData = db.define('ClassMeta', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    classId: {
        type: Sequelize.INTEGER,
    },
    dataType: {
        type: Sequelize.STRING,
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

module.exports = ClassMetaData;
