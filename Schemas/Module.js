const Teacher = require( "./Teacher");

const Sequelize = require('sequelize');


const db = require('../apis/sqConnection');



const Module = db.define('Modules', {
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
});

// Class.belongsTo(Teacher, {
//     foreignKey: {
//         name: 'teacherId'
//     }
// });

db.sync()


module.exports = Module;
