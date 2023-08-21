
const {TemplateHandler} = require("easy-template-x");
const path = require('path');
const  docxConverter = require('docx-pdf');
const Student = require("./Schemas/Student");
const Class = require("./Schemas/Class");
const Session = require("./Schemas/Session");
const Parent = require("./Schemas/Parent");
const PaymentMetaData = require("./Schemas/PaymentMetaData");
const Payment = require("./Schemas/Payment");
const SetRelations = require("./apis/Relations");

SetRelations()


async function main() {
    const id = 9;
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
                    as: "PresentSessions",
                },
                {
                    model: Parent,
                    as: "Parent",
                },
            ],
            // order: [[Session, 'createdAt', 'DESC']]
        })
        if(student !== null){
            let studentPayments = []
            let paymentMetas = await PaymentMetaData.findAll({
                where:
                    {
                        dataTitle: "studentId",
                        dataValue: student.id.toString()
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
            console.log(student)
        }
        else {
            console.log({'finalResult': true, result: 'no student with such id'})
        }

    }catch(error){
        console.log(error)
        console.log({'finalResult': false, 'error': error})
    }

// 3. save output
}

main()


