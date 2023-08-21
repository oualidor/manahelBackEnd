const  {Op} = require("sequelize");
const express = require('express');
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Teacher = require("../Schemas/Teacher");
const Validator = require("../apis/DataValidator");
const {jwtPrivateKey} = require("../config/globalConstants");
const GuestRouters = express.Router();
const argon2 = require('argon2');
// GuestRouters.use(async (req, res, next)=>{
//     await YitAuthenticator.authAll(req, res, next)
// })

//Admin Login
// GuestRouters.post('/adminLogin', async (req, res) => {
//     const {mail, password} = req.body;
//     console.log(mail)
//     console.log(password)
//     let validatedData = true;
//     let dataError = "";
//     if(!Validator.email(mail)){
//         console.log(mail)
//         validatedData = false;
//         dataError = dataError+'email: wrong email';
//     }
//     if(!validatedData){
//         res.send({'finalResult': false,  'error': dataError});
//     }else{
//         try {
//             if(mail === adminMail){
//                 if(bcrypt.compareSync(password, adminPassword)) {
//                     const accessToken = jwt.sign({mail: mail, userType:"Admin", fullName: adminName}, jwtPrivateKey);
//                     await res.json({"finalResult": true, admin: adminName, token: accessToken})
//                 } else {
//                     res.send({'finalResult': false, 'error': 'wrong password'})
//                 }
//             }else {
//                 await res.json({'finalResult': false, 'error': "wrong email or password"})
//             }
//         }catch(error){
//             res.send({'finalResult': false,  'error': error})
//         }
//     }
// });
//
// //Client Login
// GuestRouters.post('/clientLogin', async (req, res) => {
//     const {mail, password} = req.body;
//     let validatedData = true;
//     let dataError = "";
//     if(!Validator.email(mail)){
//         console.log(mail)
//         validatedData = false;
//         dataError = dataError+'email: wrong email';
//     }
//     if(!Validator.password(password)){
//         console.log("wrong")
//         console.log(mail)
//         validatedData = false;
//         dataError = dataError+' pass: mal password';
//     }
//     if(!validatedData){
//         res.send({'finalResult': false,  'error': dataError});
//     }else{
//         try{
//             let client = await Client.findOne({where: {mail: mail}})
//             if(client !== null){
//                 ClientsMiddleware.byPassStat(client, req, res, async ()=>{
//                     if(bcrypt.compareSync(password, client.hashedPassword)) {
//                         const accessToken = jwt.sign({id: client.id, mail: mail, userType:"Client"}, jwtPrivateKey);
//                         await res.json({"finalResult": true, token: accessToken})
//                     } else {
//                         res.json({finalResult: false, error: "wrong email or password"})
//                     }
//                 })
//             }else{
//                 res.json({finalResult: false, error: "wrong email or password"})
//             }
//         }catch (e){
//             console.log(e)
//             res.send({finalResult: false, error: e})
//         }
//     }
// });

GuestRouters.post('/TeachersLogin', async (req, res) => {
    const {phone, password} = req.body;
    let validatedData = true;
    let dataError = "";
    if(!Validator.password(password)){

        validatedData = false;
        dataError = dataError+' pass: mal password';
    }
    if(!validatedData){
        res.send({'finalResult': false,  'error': dataError});
    }else{
        try{
            let teacher = await Teacher.findOne({where: {phone: phone}})
            if(teacher !== null){
                try{
                    console.log(teacher.hashedPassword)
                    if(await argon2.verify(teacher.hashedPassword, password)) {

                        const accessToken = jwt.sign({id: teacher.id, userType:"teacher"}, jwtPrivateKey);
                        await res.json({"finalResult": true, token: accessToken})
                    } else {
                        res.json({finalResult: false, error: "wrong phone or password"})
                    }
                }catch (error){
                    console.log(error)
                }

            }else{
                res.json({finalResult: false, error: "wrong phone or password"})
            }
        }catch (error){
            console.log(error)
            res.send({finalResult: false, error: error})
        }
    }
});




module.exports = GuestRouters
