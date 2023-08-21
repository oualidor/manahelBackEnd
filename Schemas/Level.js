const Sequelize = require('sequelize');
const db = require('../apis/sqConnection');


const Level = db.define('Levels', {
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
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
    }
});


module.exports = Level;
