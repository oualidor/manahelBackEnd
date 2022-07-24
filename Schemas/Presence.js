const Sequelize = require('sequelize');


const db = require('../apis/sqConnection');
const Student = require("./Student");


const Presence = db.define('Presence', {
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
});

Presence.belongsTo(Student, {
    foreignKey: {
        name: 'studentId'
    }
});



module.exports = Presence;