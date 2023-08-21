const express = require('express');
const seq = require('sequelize');
const router = express.Router();
const Class = require('../../Schemas/Class');
const Teacher = require('../../Schemas/Teacher');
const Level = require('../../Schemas/Level');
const Module = require('../../Schemas/Module');
const ClassType = require('../../Schemas/ClassType');
const ClassSession = require('../../Schemas/ClassSession');
const ClassMetaData = require('../../Schemas/ClassMetaData');
const ClassContract = require('../../Schemas/ClassContract');
const Session = require("../../Schemas/Session");
const Payment = require("../../Schemas/Payment");
const PaymentMetaData = require("../../Schemas/PaymentMetaData");

const LevelRouters = express.Router()

LevelRouters.post('/create',  async (req, res) => {
    console.log('/////////////////////////')
    let {name} = req.body;
    let validatedData = true;
    let dataError = "";

    if(!validatedData){
        res.send({'finalResult': false,  'error': dataError});
    }else{
        let data = {name};
        try {
            await Level.create(data);
            res.send({'finalResult': true, 'result': true})
        }catch (e) {
            console.log(e)
            res.send({'finalResult': false, 'error': e})
        }
    }
});

LevelRouters.get('/getAll/:offset/:limit',  async (req, res) => {
    let {offset, limit} = req.params;
    limit = parseInt(limit);
    offset = parseInt(offset);
    Level.findAndCountAll({
        offset: offset,
        limit: limit,
    })
        .then(Classes =>
            res.send({'finalResult': true, 'result': Classes})
        )
        .catch(err =>{
            console.log(err)
            res.send({'finalResult': false, 'error': err})
        });

})






module.exports = LevelRouters;














