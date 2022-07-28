const Sequelize = require('sequelize');
const db = require('../apis/sqConnection');
const {Model} = require("sequelize");

class Student  extends Model {}
const attributes = {
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
                msg: 'الرجاء ادخال اسم',
            }
        }
    },
    mail: {
        type: Sequelize.STRING,
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'رقم الهاتف مسجل لدينا',

        },
        validate: {
            notNull : {
                args: false,
                msg: 'تأكد من رقم الهاتف',
            },

        }
    },
    birthDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notNull : {
                args: false,
                msg: 'الرجاء ادخال تارخ الميلاد',
            },
            isAcceptedDate (value) {
                let  year  = new Date().getFullYear();
                let  month = new Date().getMonth();
                let  day   = new Date().getDate();
                let  date  = new Date(year + -5, month, day);
                if (value > date) {
                    throw new Error('يجب أن يكون العمر أكبر من 5 سنوات');
                }
            }
        }
    },
    sex: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
            isIn: {
                args: [['0', '1']],
                msg: 'اختر الجنس من فضلك'
            },
        }
    },
    facebook:{
        type: Sequelize.STRING(30),
    },
    image:{
        type: Sequelize.STRING
    },
    x:{
        type: Sequelize.DOUBLE
    },
    y:{
        type: Sequelize.DOUBLE
    },
    stat:{
        type: Sequelize.INTEGER
    },
    parentId:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    parentRelation:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
}

const options = {sequelize: db, modelName: 'Students'}
Student.init(attributes, options)


module.exports = Student;
