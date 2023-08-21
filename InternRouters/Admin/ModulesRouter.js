const express = require('express');
const seq = require('sequelize');
const router = express.Router();

const Module = require('../../Schemas/Module');
const PaymentMetaData = require("../../Schemas/PaymentMetaData");

const ModulesRouter = express.Router()

ModulesRouter.post('/create',  async (req, res) => {
    console.log('/////////////////////////')
    let {name} = req.body;
    let validatedData = true;
    let dataError = "";

    if(!validatedData){
        res.send({'finalResult': false,  'error': dataError});
    }else{
        let data = {name};
        try {
            await Module.create(data);
            res.send({'finalResult': true, 'result': true})
        }catch (e) {
            console.log(e)
            res.send({'finalResult': false, 'error': e})
        }
    }
});

ModulesRouter.get('/getAll/:offset/:limit',  async (req, res) => {
    let {offset, limit} = req.params;
    limit = parseInt(limit);
    offset = parseInt(offset);
    Module.findAndCountAll({
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






module.exports = ModulesRouter;














