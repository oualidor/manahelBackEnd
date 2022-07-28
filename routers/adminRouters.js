const express = require('express');
const AdminParentRouter = require("../InternRouters/Admin/AminParentRouter");

const router = express.Router();

//Admin Login


//Parent

router.use("/Parent",   AdminParentRouter);
//Student Manipulation
const AdminStudentRouters = require("../InternRouters/Admin/StudentRouters");
let studentRouters = new AdminStudentRouters();
router.use("/Student",   studentRouters.create);


//Teacher Manipulation
const AdminTeacherRouters = require("../InternRouters/Admin/TeacherRouter");
let teacherRouters = new AdminTeacherRouters();
router.use("/Teacher",   teacherRouters.create);


//Class Manipulation
const AdminClassRouters = require("../InternRouters/Admin/ClassRouters");
let classRouters = new AdminClassRouters();
router.use("/Class",   classRouters.create);

//Class Manipulation
const AdminSessionRouters = require("../InternRouters/Admin/SessionRouter");
const PaymentRouter = require("../InternRouters/Admin/PaymentRouter");


let sessionRouters = new AdminSessionRouters();
router.use("/Session",   sessionRouters.create);

router.use("/Payment",   PaymentRouter);


module.exports = router;
