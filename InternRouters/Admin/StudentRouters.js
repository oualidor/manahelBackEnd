const express = require('express');
const seq = require('sequelize');
const router = express.Router();
const Student = require('../../Schemas/Student');
const Payment = require('../../Schemas/Payment');
const Validator = require('../../apis/dataValidator');
const Class = require("../../Schemas/Class");
const ClassMetaData = require("../../Schemas/ClassMetaData");
const Session = require("../../Schemas/Session");
const SessionMeta = require("../../Schemas/SessionMetaData");
const PaymentMetaData = require("../../Schemas/PaymentMetaData");

Student.belongsToMany(Class, {
    through: ClassMetaData,
    foreignKey: "dataValue"
});


Student.belongsToMany(Class, {
    through: ClassMetaData,
    foreignKey: "dataValue"
});

Student.belongsToMany(Session, {
    through: SessionMeta,
    foreignKey: "dataValue"
});

Payment.hasMany(PaymentMetaData, {foreignKey: "paymentId"})


Class.hasMany(Session, {as : 'ClassSessions', foreignKey : 'classId'});

class StudentRouters {
    constructor() {
        this.create = router.post('/create',  async (req, res) => {
            let {phone, birthDate, name, sexe, mail, parentName, parentPhone, parentRelation} = req.body;
            let validatedData = true;
            let dataError = "";

            if(!validatedData){
                res.send({'finalResult': false,  'error': dataError});
            }else{
                let data = {phone, birthDate, name, sexe, mail, parentName, parentPhone, parentRelation};
                try {
                    await Student.create(data);
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
                let customer = await Student.findByPk(id);
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
            var {offset, limit} = req.params;
            limit = parseInt(limit);
            offset = parseInt(offset);
            if (limit === 0) limit = 99999999
            Student.findAndCountAll({
                offset: offset,
                limit: limit,
            })
                .then(stores =>
                    res.send({'finalResult': true, 'result': stores})
                )
                .catch(err =>
                    res.send({'finalResult': false, 'error': true})
                );
        });

        this.getOne = router.get('/getOne/:id',  async (req, res) => {
            const id = parseInt(req.params.id);
            try{
                let student  = await Student.findByPk(id, {
                    include: [
                        {
                            model: Class,
                            as: "Classes",
                            include: [
                                {
                                    model: Session,
                                    as: "ClassSessions",
                                    order: [[Session, 'createdAt', 'DESC']]

                                }
                            ],
                        },
                        {
                            model: Session,
                            as: "Sessions",
                        },

                    ],
                    order: [[Session, 'createdAt', 'DESC']]
                })
                let studentPayments = []
                let paymentMetas = await PaymentMetaData.findAll({
                    where:
                        {
                            dataTitle: "studentId",
                            dataValue: student.id
                        }
                })
                for (const meta of paymentMetas) {
                    let studentPayment = await  Payment.findByPk(
                        meta.paymentId,
                        {
                            include: [
                                PaymentMetaData
                            ]
                        }
                    )
                    studentPayments.push(studentPayment)
                }

                /*let studentPayments = await  Payment.findAll({
                    where : {id: }
                })*/

                student.dataValues.Payment  = studentPayments
                /*let payment = await Payment.findAll(
                    {

                    }
                    )*/
                res.send({finalResult: true, result: student})
            }catch(error){
                console.log(error)
                res.json({'finalResult': false, 'error': error})
            }
        });

        this.getOneByAttribute = router.get('/getOne/:id/:attribute',  async (req, res) => {
            const id = parseInt(req.params.id);
            const attribute = req.params.attribute;
            Student.findByPk(id, {attributes: [attribute]})
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
                let customer = await Student.findByPk(id);
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
            const {attribute, key} = req.params;
            let data = {where : { [attribute] : { [seq.Op.like] : '%' + key + '%' } }};
            try{
                let customer = await Student.findAndCountAll(data);
                res.send({'finalResult': true, 'result': customer})
            }catch (e) {
                res.send({'finalResult': false, 'error': e})
            }
        });

        this.delete = router.get('/delete/:id',  async (req, res) => {
            const id = parseInt(req.params.id);
            try {
                let customer = await Student.findByPk(id);
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

        this.pay = router.post('/pay',  async (req, res) => {
            let {studentId, classId, amount} = req.body;
            let validatedData = true;
            let dataError = "";

            if(!validatedData){
                res.send({'finalResult': false,  'error': dataError});
            }else{
                let data = {amount, type: 0};
                let newPayment= await Payment.create(data);
                let meta = [
                    {paymentId: newPayment.id, dataTitle: "studentId", dataValue: studentId},
                    {paymentId: newPayment.id, dataTitle: "classId", dataValue: classId}
                    ]
                try {

                    await PaymentMetaData.bulkCreate(meta);
                    res.send({'finalResult': true, 'result': true})
                }catch (e) {
                    console.log(e)
                    res.send({'finalResult': false, 'error': e})
                }
            }
        });
    }
}




module.exports = StudentRouters;














