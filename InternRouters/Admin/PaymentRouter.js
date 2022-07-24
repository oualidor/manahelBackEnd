const express = require('express');
const seq = require('sequelize');
const Teacher = require('../../Schemas/Teacher');
const Payment = require('../../Schemas/Payment');
const PaymentMetaData = require('../../Schemas/PaymentMetaData');
const Session = require("../../Schemas/Session");
const {Op} = require("sequelize");


Payment.hasMany(PaymentMetaData, {foreignKey: "paymentId"})
const  PaymentRouter = express.Router()

PaymentRouter.get('/getAll/:offset/:limit',  async (req, res) => {
    var {offset, limit} = req.params;
    limit = parseInt(limit);
    offset = parseInt(offset);
    if (limit === 0) limit = 99999999
    Payment.findAndCountAll({
        offset: offset, limit: limit,
            include: [
                {
                    model: PaymentMetaData,

                }
            ],
    }
    )
        .then(stores =>
            res.send({'finalResult': true, 'result': stores})
        )
        .catch(err =>
            res.send({'finalResult': false, 'error': true})
        );
});

PaymentRouter.get('/getAll/:offset/:limit/:filter',  async (req, res) => {
    var {offset, limit, filter} = req.params;
    limit = parseInt(limit);
    offset = parseInt(offset);
    if (limit === 0) limit = 99999999
    Payment.findAndCountAll({
            offset: offset, limit: limit,
            include: [
                {
                    model: PaymentMetaData,
                    where :  {[Op.or]: [{ dataTitle: "classId" }, { dataTitle: "studentId" }]},

                }
            ],
        }
    )
        .then(stores =>
            res.send({'finalResult': true, 'result': stores})
        )
        .catch(err =>
            res.send({'finalResult': false, 'error': true})
        );
});

PaymentRouter.get('/delete/:id',  async (req, res) => {
    try{
        let {id} = req.params
        let payment = await Payment.findByPk(id, {
            include: [
                {
                    model: PaymentMetaData
                }
            ]
        })
        if(payment !== null){
            let metaData = await PaymentMetaData.findAll({where: {paymentId: payment.id}})
            metaData.forEach(entry =>{
                entry.destroy()
            })
            payment.destroy()
            res.send({finalResult: true, result : 'payment deleted'})

        }else {
            res.send({finalResult: false, result : "payment not found"})

        }
        res.send({finalResult: true, result : payment})
    }catch (error){
        console.log(error)
        res.send({finalResult: false, result : "request failed"})
    }

})

PaymentRouter.post('/create',  async (req, res) => {
    let {amount, type, metaData} = req.body;
    console.log(metaData)
    let validatedData = true;
    let dataError = "";

    if(!validatedData){
        res.send({'finalResult': false,  'error': dataError});
    }else{
        let data = {amount, type: type};
        let newPayment= await Payment.create(data);
        let newMetaData = []
        metaData.forEach(entry =>{
            newMetaData.push({paymentId: newPayment.id, dataTitle: entry.name, dataValue: entry.value},)
        })
        try {
            await PaymentMetaData.bulkCreate(newMetaData);
            res.send({'finalResult': true, 'result': true})
        }catch (e) {
            console.log(e)
            res.send({'finalResult': false, 'error': e})
        }
    }
});


module.exports = PaymentRouter;














