const Payment = require("./Schemas/Payment");
const PaymentMetaData = require("./Schemas/PaymentMetaData");
const {Op} = require("sequelize");
Payment.hasMany(PaymentMetaData, {foreignKey: "paymentId"})
async function run(id){
    // let payments = await Payment.findAll({
    //     include: [
    //         {
    //             model: PaymentMetaData,
    //             where: {
    //
    //                     dataValue: "1"
    //
    //
    //             },
    //         }
    //     ]
    // })
    // console.log(payments)

    let date = new Date()
    console.log(date.getDay())
}


run("1")
