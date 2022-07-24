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

Class.hasMany(ClassMetaData, {as : 'ClassMeta', foreignKey : 'classId'});
Class.hasMany(ClassSession, {as : 'ClassSession', foreignKey : 'classId'});
Class.hasMany(Session, {as : 'Sessions', foreignKey : 'classId'});





class ClassRouters {
    constructor() {
        this.create = router.post('/create',  async (req, res) => {
            let {teacherId, name, day, type} = req.body;
            let validatedData = true;
            let dataError = "";

            if(!validatedData){
                res.send({'finalResult': false,  'error': dataError});
            }else{
                let data = {teacherId, name, day, type};
                try {
                    await Class.create(data);
                    res.send({'finalResult': true, 'result': true})
                }catch (e) {
                    console.log(e)
                    res.send({'finalResult': false, 'error': e})
                }
            }
        });

        this.update = router.post('/update/:id',  async (req, res) => {
            const id = parseInt(req.params.id);
            const {mail, phone, password, name} = req.body;
            let data = {mail, phone, password, name};
            try {
                let customer = await Class.findByPk(id);
                if(customer != null){
                    try {
                        await customer.update(data);
                        res.send({'finalResult': true, 'result': "Customer Information updated"})
                    }catch (ee) {
                        res.send({'finalResult': false, 'error': ee})
                    }
                }else{
                    res.send({'finalResult': false, 'error': "No customer with the provided Id"})
                }
            }catch (e){
                res.send({'finalResult': false, 'error': "some thing went wrong"})
            }
        });

        this.getAll = router.get('/getAll/:offset/:limit',  async (req, res) => {
            console.log("test")
            var {offset, limit} = req.params;
            limit = parseInt(limit);
            offset = parseInt(offset);
            if (limit === 0) limit = 99999999
            Class.findAndCountAll({
                offset: offset,
                limit: limit,
                include : [
                    {model: Teacher, as: "Teacher",},
                    {model: ClassSession, as: "ClassSession",},
                    ]
            })
                .then(Classes =>
                    res.send({'finalResult': true, 'result': Classes})
                )
                .catch(err =>{
                    console.log(err)
                        res.send({'finalResult': false, 'error': err})
                });
        });

        this.getOne = router.get('/getOne/:id',  async (req, res) => {
            const id = parseInt(req.params.id);
            Class.findByPk(
                    id,
            {include: [
                        {model: Teacher, as: "Teacher",},
                        {model: Level, as: "Level",},
                        {model: Module, as: "Module",},
                        {model: ClassType, as: "ClassType",},
                        {model: ClassMetaData, as: "ClassMeta",},
                        {model: ClassSession, as: "ClassSession",},
                        {model: ClassContract, as: "ClassContract",},
                        {model: Session, as: "ClassSessions",},
                    ]}
            )
                .then(async _class => {
                    let classPayments = []
                    let paymentMetas = await PaymentMetaData.findAll({
                        where:
                            {
                                dataTitle: "classId",
                                dataValue: _class.id
                            }
                    })
                    for (const meta of paymentMetas) {
                        let studentPayment = await Payment.findByPk(
                            meta.paymentId,
                            {
                                include: [
                                    PaymentMetaData
                                ]
                            }
                        )
                        classPayments.push(studentPayment)
                    }

                    /*let studentPayments = await  Payment.findAll({
                        where : {id: }
                    })*/

                    _class.dataValues.Payment = classPayments
                    /*let payment = await Payment.findAll(
                        {

                        }
                        )*/
                    res.send({'finalResult': true, 'result': _class})
                })
                .catch(err =>{
                    console.log(err)
                    res.send({'finalResult': false, 'error': err})
                });
        });

        this.getOneByAttribute = router.get('/getOne/:id/:attribute',  async (req, res) => {
            const id = parseInt(req.params.id);
            const attribute = req.params.attribute;
            Class.findByPk(id, {attributes: [attribute]})
                .then(customer =>
                    res.send({'finalResult': true, 'result': customer})
                )
                .catch(err =>
                    res.send({'finalResult': false, 'error': err})
                );
        });

        this.validate = router.get('/validate/:id',  async (req, res) => {
            const id = parseInt(req.params.id);

            let data = {valid: 1};
            try {
                let customer = await Class.findByPk(id);
                if(customer != null){
                    try {
                        await customer.update(data);
                        res.send({'finalResult': true, 'result': "Customer validated"})
                    }catch (ee) {
                        res.send({'finalResult': false, 'error': ee})
                    }
                }else{
                    res.send({'finalResult': false, 'error': "No customer with the provided Id"})
                }
            }catch (e){
                res.send({'finalResult': false, 'error': "some thing went wrong"})
            }
        });

        this.searchBy = router.get('/earchBy/:attribute/:key',  async (req, res) => {
            const {attribute, key} = req.params;
            let data = {where : { [attribute] : { [seq.Op.like] : '%' + key + '%' } }};
            try{
                let customer = await Class.findAll(data);
                res.send({'finalResult': true, 'result': customer})
            }catch (e) {
                res.send({'finalResult': false, 'error': e})
            }
        });

        this.delete = router.get('/delete/:id',  async (req, res) => {
            const id = parseInt(req.params.id);
            try {
                let customer = await Class.findByPk(id);
                if(customer != null){
                    try {
                        await customer.destroy();
                        res.send({'finalResult': true, 'result': "Customer deleted"})
                    }catch (ee) {
                        res.send({'finalResult': false, 'error': ee})
                    }
                }else{
                    res.send({'finalResult': false, 'error': "No customer with the provided Id"})
                }
            }catch (e){
                res.send({'finalResult': false, 'error': e})
            }
        });

        this.addMetadata = router.post('/addMetaData',  async (req, res) => {
            let {classId, dataType, dataTitle, dataValue} = req.body;
            let validatedData = true;
            let dataError = "";

            if(!validatedData){
                res.send({'finalResult': false,  'error': dataError});
            }else{
                let data = {classId, dataType, dataTitle, dataValue};
                try {
                    await ClassMetaData.create(data);
                    res.send({'finalResult': true, 'result': true})
                }catch (e) {
                    console.log(e)
                    res.send({'finalResult': false, 'error': e})
                }
            }
        });
    }
}




module.exports = ClassRouters;














