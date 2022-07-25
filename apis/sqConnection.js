const Sequelize = require('sequelize');
const path  = require('path')
/*
const db = new Sequelize('manaheel', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    logging: false
});

 */

/*
const db = new Sequelize('manahel', 'root', '', {
    host: 'remotemysql.com',
    dialect: 'mysql',
    operatorsAliases: false,
    logging: false
});
*/

const dbPath = path.join(__dirname, "DB2022-2023.sqlite")
const db = new Sequelize({
    // sqlite! now!
    dialect: 'sqlite',

    // the storage engine for sqlite
    // - default ':memory:'
    storage: dbPath,
    logging: false
})



module.exports = db;
