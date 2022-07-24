

const Sequelize = require('sequelize');


const db = require('../apis/sqConnection');
const Session = require("./Session");
const Student = require("./Student");


const SessionMeta = db.define('SessionsMeta', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sessionId: {
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



SessionMeta.belongsTo(Session, {
    foreignKey: {
        name: 'sessionId'
    }
});

SessionMeta.belongsTo(Student, {
    foreignKey: {
        name: 'dataValue'
    }
});

db.sync();

module.exports = SessionMeta;