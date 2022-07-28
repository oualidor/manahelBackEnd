const Sequelize = require('sequelize');
const db = require('../apis/sqConnection');
const {Model} = require("sequelize");


class Parent  extends Model {}

const ModelAttributes = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: {
            notNull : {
                args: false,
                msg: 'A parent name required',
            }
        }
    },
    mail: {
        type: Sequelize.STRING(30),
        allowNull: true,
        unique: true
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: {
            args: false,
            msg: "111111111111111111111111111111111111111111111111"
        },
    },
    sex: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
            customValidator(value) {
                if (value === null && this.age !== 10) {
                    throw new Error("name can't be null unless age is 10");
                }
            }
        }
    },
    messenger: {
        type: Sequelize.STRING(30),
        unique: true
    },
    image: {
        type: Sequelize.STRING
    },
    address:{
        type: Sequelize.STRING(200),
    },
    x:{
        type: Sequelize.DOUBLE
    },
    y:{
        type: Sequelize.DOUBLE
    },
}
const Options = {sequelize: db, modelName: 'Parents'}
Parent.init(ModelAttributes, Options)


module.exports = Parent;
