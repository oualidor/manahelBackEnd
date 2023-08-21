const express = require('express');
const seq = require('sequelize');
const Student = require('../../Schemas/Student');
const Parent = require("../../Schemas/Parent");


const AdminParentRouter = express.Router()

AdminParentRouter.post('/create',  async (req, res) => {
    let {name, mail, phone, birthDate, sex, parentId} = req.body;
    let validatedData = true;
    let dataError = "";

    if(!validatedData){
        res.send({'finalResult': false,  'error': dataError});
    }else{
        let data = {name, mail, phone, birthDate, sex, parentId};
        try {
            let newParent = await Parent.create(data);
            res.send({'finalResult': true, 'result': newParent})
        }catch (e) {
            console.log(e)
            res.send({'finalResult': false, 'error': e})
        }
    }
});


module.exports = AdminParentRouter














