const Sequelize = require('sequelize');
const path  = require('path')


// const dbPath = path.join(__dirname, "DB 2021-2022Test.sqlite")
// const db = new Sequelize({
//     // sqlite! now!
//     dialect: 'sqlite',
//
//     // the storage engine for sqlite
//     // - default ':memory:'
//     storage: dbPath,
//     logging: false
// })

const db = new Sequelize('manaheel', 'postgres', '1223', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});



// const db = new Sequelize('postgres://bbtizpmirmxzxk:6c9361b613114bee894cdbc93e1ea0acd446134c87a66e79f6c5ef72cf1ad57e@ec2-44-195-100-240.compute-1.amazonaws.com:5432/ddjfnmoialdni0', {
//         dialectOptions: {
//             ssl: {
//                 require: true,
//                 rejectUnauthorized: false
//             }
//         }
//     }
// );




module.exports = db;
