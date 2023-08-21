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
const Student = require("../../Schemas/Student");


class ClassRouters {
    constructor() {
        this.create = router.post('/create',  async (req, res) => {
            let {teacherId, name,  typeId, moduleId, levelId, contractId, price, managed} = req.body;

            console.log(req.body)
            let validatedData = true;
            let dataError = "";

            if(!validatedData){
                res.send({'finalResult': false,  'error': dataError});
            }else{
                let data = {teacherId, name, typeId,  moduleId, levelId, contractId, price, managed};
                try {
                    let classs  = await Class.create(data);
                    res.send({'finalResult': true, 'result': classs})
                }catch (e) {
                    console.log(e)
                    res.send({'finalResult': false, 'error': e})
                }
            }
        });

        this.create = router.post('/classSessions/create',  async (req, res) => {

            let {data} = req.body;
            console.log('*****************************')
            console.log(data)
            let validatedData = true;
            let dataError = "";

            if(!validatedData){
                res.send({'finalResult': false,  'error': dataError});
            }else{
                try {
                    await ClassSession.bulkCreate(data);
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
            let {offset, limit} = req.params;
            limit = parseInt(limit);
            offset = parseInt(offset);
            if (limit === 0) limit = 99999999
            Class.findAndCountAll({
                offset: offset,
                limit: limit,
                where: {
                    teacherId:  req.body.id
                },
                include: [
                    {model: Teacher,},
                    {model: ClassContract,},
                    {model: ClassSession, as: 'ClassSession'},
                    {model: Student}
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
                        {model: Student, as: "Students",},
                    ]}
            )
                .then(async _class => {
                    let classPayments = []
                    let paymentMetas = await PaymentMetaData.findAll({
                        where:
                            {
                                dataTitle: "classId",
                                dataValue: _class.id.toString()
                            }
                    })
                    // for (const meta of paymentMetas) {
                    //     let studentPayment = await Payment.findByPk(
                    //         meta.paymentId,
                    //         {
                    //             include: [
                    //                 PaymentMetaData
                    //             ]
                    //         }
                    //     )
                    //     classPayments.push(studentPayment)
                    // }

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

        this.searchBy = router.get('/searchBy/:attribute/:key',  async (req, res) => {
            console.log('///////////////////////////')
            const {attribute, key} = req.params;
            console.log(attribute)
            let data = {
                where : { [attribute] :   {[seq.Op.like]:  '%' + key + '%'}  },
                include: [
                    {model: Teacher, as: "Teacher",}
                ]
                // include: {model: Parent}
            };
            try{
                let customer = await Class.findAndCountAll(data);
                res.send({'finalResult': true, 'result': customer})
            }catch (e) {
                console.log(e)
                res.send({'finalResult': false, 'error': e})
            }
        });

        this.delete = router.delete('/:id',  async (req, res) => {
            console.log('/////////////////////')
            const id = parseInt(req.params.id);
            try {
                let _class = await Class.findByPk(id, {
                    include: [
                        {model: ClassSession, as: 'ClassSession'}
                    ]
                });
                if(_class != null){
                    try{
                         await ClassSession.destroy({where: {classId: _class.id}})
                        await _class.destroy();
                        res.send({'finalResult': true, 'result': "Class deleted"})

                    }catch (e){
                        res.send({'finalResult': false, 'error': "Failed to delete"})
                    }
                }else{
                    res.send({'finalResult': false, 'error': "No class with the provided Id"})
                }
            }catch (e){
                console.log(e)
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














