const express = require('express');


const TeacherRouter = express.Router();


//
// //Teacher Manipulation
// const AdminTeacherRouters = require("../InternRouters/Admin/TeacherRouter");
// let teacherRouters = new AdminTeacherRouters();
// TeacherRouter.use("/Teacher",   teacherRouters.create);


//Class Manipulation
const AdminClassRouters = require("../InternRouters/Admin/ClassRouters");
let classRouters = new AdminClassRouters();
TeacherRouter.use("/Class",   classRouters.create);

//Class Manipulation
const AdminSessionRouters = require("../InternRouters/Admin/SessionRouter");
const PaymentRouter = require("../InternRouters/Admin/PaymentRouter");

let sessionRouters = new AdminSessionRouters();
TeacherRouter.use("/Session",   sessionRouters.create);

// TeacherRouter.use("/Payment",   PaymentRouter);


module.exports = TeacherRouter
