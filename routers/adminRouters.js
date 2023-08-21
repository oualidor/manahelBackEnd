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
const LevelRouters = require("../InternRouters/Admin/LevelRouters");
const ModulesRouter = require("../InternRouters/Admin/ModulesRouter");
const ClassTypeRouter = require("../InternRouters/Admin/ClassTypeRouter");
const ContractRouter = require("../InternRouters/Admin/ClassContractRouter");


let sessionRouters = new AdminSessionRouters();
router.use("/Session",   sessionRouters.create);

router.use("/Payment",   PaymentRouter);
router.use("/Level",   LevelRouters);
router.use("/Module",   ModulesRouter);
router.use("/ClassType",   ClassTypeRouter);
router.use("/ClassContract",   ContractRouter);


module.exports = router;
