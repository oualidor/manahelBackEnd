const Sequelize = require('sequelize');
const db = require('../apis/sqConnection');

const LevelModules = db.define('LevelModules', {}, { timestamps: false });

module.exports = LevelModules
