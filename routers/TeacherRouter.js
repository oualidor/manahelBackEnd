const express = require('express');
const jwt  = require('jsonwebtoken');

const TeacherRouter = express.Router();

TeacherRouter.use((req, res, next)=>{
    const authHead = req.headers['authorization'];
    const token = authHead && authHead.split(' ')[1];
    console.log(token)
    if (token == null) {

        res.send({finalResult: false, error: "UnAuthorised"});
    } else {
        jwt.verify(token, jwtPrivateKey, (err, data) => {
            if (err) res.send({finalResult: false, error: err});
            if (data.userType === "teacher") {
                req.body.id = data.id;
                req.body.email = data.email;
                req.body.userType = data.userType;
                next()
            } else {
                res.send({finalResult: false, error: "UnAuthorised"});
            }
        })
    }
})



//
// //Teacher Manipulation
// const AdminTeacherRouters = require("../InternRouters/Admin/TeacherRouter");
// let teacherRouters = new AdminTeacherRouters();
// TeacherRouter.use("/Teacher",   teacherRouters.create);


//Class Manipulation
const AdminClassRouters = require("../InternRouters/Teacher/ClassRouters");
let classRouters = new AdminClassRouters();
TeacherRouter.use("/Class",   classRouters.create);

//Class Manipulation
const AdminSessionRouters = require("../InternRouters/Admin/SessionRouter");
const PaymentRouter = require("../InternRouters/Admin/PaymentRouter");
const {jwtPrivateKey} = require("../config/globalConstants");

let sessionRouters = new AdminSessionRouters();
TeacherRouter.use("/Session",   sessionRouters.create);

// TeacherRouter.use("/Payment",   PaymentRouter);


module.exports = TeacherRouter
