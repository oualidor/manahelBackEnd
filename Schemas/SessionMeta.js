const Sequelize = require('sequelize');
const db = require('../apis/sqConnection');
const {Model} = require("sequelize");


class SessionMeta  extends Model {}
const attributes = {
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
}
const options = {sequelize: db, modelName: 'SessionsMeta'}
SessionMeta.init(attributes, options)


module.exports = SessionMeta;
