const Sequelize = require('sequelize');


const db = require('../apis/sqConnection');
const Student = require("./Student");
const Session = require("./Session");
const {Model} = require("sequelize");

class Presence  extends Model {}
const attributes = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    studentId: {
        type: Sequelize.INTEGER,
    },
    sessionId: {
        type: Sequelize.INTEGER,
    },
}

const options = {sequelize: db, modelName: 'Presence'}
Presence.init(attributes, options)




module.exports = Presence;
