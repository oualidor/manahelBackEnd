const express = require('express');
const seq = require('sequelize');
const router = express.Router();
const Teacher = require('../../Schemas/Teacher');
const Payment = require('../../Schemas/Payment');
const PaymentMetaData = require('../../Schemas/PaymentMetaData');
const Validator = require('../../apis/dataValidator');
const Class = require("../../Schemas/Class");
const Session = require("../../Schemas/Session");
const ClassMetaData = require("../../Schemas/ClassMetaData");

Teacher.hasMany(Class, {foreignKey: "teacherId"})
class TeacherRouter {
    constructor() {
        this.create = router.post('/create',  async (req, res) => {
            let {phone, name, mail, level, sexe} = req.body;
            let validatedData = true;
            let dataError = "";

            if(!validatedData){
                res.send({'finalResult': false,  'error': dataError});
            }else{
                let data = {phone,name, mail, level, sexe};
                try {
                    await Teacher.create(data);
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
                let customer = await Teacher.findByPk(id);
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
            Teacher.findAll({offset: offset, limit: limit})
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
                let teacher  = await Teacher.findByPk(id, {
                    include: [
                        {
                            model: Class,
                            as: "Classes",
                            include : [
                                {
                                    model: Session,
                                    as: "Sessions",
                                },
                                {
                                    model: ClassMetaData,
                                    as: "ClassMeta",
                                }
                            ]
                        }

                    ],
                })
                let teacherPayment = []
                let paymentMetas = await PaymentMetaData.findAll({
                    where:
                        {
                            dataTitle: "teacherId",
                            dataValue: teacher.id
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
                    teacherPayment.push(studentPayment)
                }

                /*let studentPayments = await  Payment.findAll({
                    where : {id: }
                })*/

                teacher.dataValues.Payment  = teacherPayment
                /*let payment = await Payment.findAll(
                    {

                    }
                    )*/
                res.send({finalResult: true, result: teacher})
            }catch(error){
                console.log(error)
                res.send({'finalResult': false, 'error': error})
            }
        });

        this.pay = router.post('/pay',  async (req, res) => {
            let {teacherId, classId, amount, type} = req.body;
            let validatedData = true;
            let dataError = "";

            if(!validatedData){
                res.send({'finalResult': false,  'error': dataError});
            }else{
                let data = {amount, type: type};
                let newPayment= await Payment.create(data);
                let meta = [
                    {paymentId: newPayment.id, dataTitle: "teacherId", dataValue: teacherId},
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


        this.searchBy = router.get('/earchBy/:attribute/:key',  async (req, res) => {
            const {attribute, key} = req.params;
            let data = {where : { [attribute] : { [seq.Op.like] : '%' + key + '%' } }};
            try{
                let customer = await Teacher.findAll(data);
                res.send({'finalResult': true, 'result': customer})
            }catch (e) {
                res.send({'finalResult': false, 'error': e})
            }
        });

        this.delete = router.get('/delete/:id',  async (req, res) => {
            const id = parseInt(req.params.id);
            try {
                let customer = await Teacher.findByPk(id);
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
    }
}




module.exports = TeacherRouter;














