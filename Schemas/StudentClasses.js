const Sequelize = require('sequelize');
const db = require('../apis/sqConnection');
const {Model} = require("sequelize");
class StudentClasses  extends Model {}
const ModelAttributes =  {




};
const Options = {sequelize: db, modelName: 'StudentClasses'}
StudentClasses.init(ModelAttributes, Options)
module.exports = StudentClasses;
