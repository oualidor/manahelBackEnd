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

// const dbPath = path.join(__dirname, "DB2022-2023.sqlite")
// const db = new Sequelize({
//     // sqlite! now!
//     dialect: 'sqlite',
//
//     // the storage engine for sqlite
//     // - default ':memory:'
//     storage: dbPath,
//     logging: false
// })
//

// const db = new Sequelize('ddjfnmoialdni0', 'bbtizpmirmxzxk', '6c9361b613114bee894cdbc93e1ea0acd446134c87a66e79f6c5ef72cf1ad57e', {
//
//     host: 'ec2-44-195-100-240.compute-1.amazonaws.com',
//     dialect: 'postgres',
//     port: "5432",
//     operatorsAliases: 0,
//     logging: false,
//     ssl: {
//         require: true,
//         rejectUnauthorized: false
//     }
//
// });

const db = new Sequelize('postgres://bbtizpmirmxzxk:6c9361b613114bee894cdbc93e1ea0acd446134c87a66e79f6c5ef72cf1ad57e@ec2-44-195-100-240.compute-1.amazonaws.com:5432/ddjfnmoialdni0', {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
);




module.exports = db;
