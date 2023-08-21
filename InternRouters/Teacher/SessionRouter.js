const Teacher = require( "../../Schemas/Teacher");
const express = require('express');
const seq = require('sequelize');
const router = express.Router();
const Session = require('../../Schemas/Session');
const SessionMeta = require('../../Schemas/SessionMeta');
const Class = require('../../Schemas/Class');
const ClassMetaData = require('../../Schemas/ClassMetaData');
const Presence = require('../../Schemas/Presence');
const Student = require("../../Schemas/Student");
const {Sequelize, Op} = require("sequelize");




class ClassRouters {
    constructor() {
        this.create = router.post('/create',  async (req, res) => {
            console.log('//////////////////')
            let {Supervisor, type, classId,   saleId, duration } = req.body;
            console.log(req.body)
            let validatedData = true;
            let dataError = "";

            if(!validatedData){
                res.send({'finalResult': false,  'error': dataError});
            }else{
                let data = {Supervisor, type, classId,  saleId, duration};
                try {
                    let session = await Session.create(data);
                    res.send({'finalResult': true, 'result': session})
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
                let customer = await Session.findByPk(id);
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
            Session.findAll({
                offset: offset,
                limit: limit,
                include : [
                    {
                        model: SessionMeta,
                        as: "SessionsMeta",

                    },
                    {
                        model: Class,
                        as: "Class",
                        include: [
                            {
                                model: Teacher,
                                as: "Teacher"
                            },
                            {
                                model: ClassMetaData,
                                as: "ClassMeta",

                            },

                            {
                                model: Student,

                            }
                        ]
                    },
                    {
                        model: Student,
                        as: 'PresentStudents',
                    },
                ],
                order: [['createdAt', 'DESC']]
            })
                .then(Classes =>
                    res.send({'finalResult': true, 'result': Classes})
                )
                .catch(err =>{
                        console.log(err)
                        res.send({'finalResult': false, 'error': err})
                });
        });

        this.getOne = router.get('/getOne/:id',  async (req, res) => {
            console.log('***********************')
            const id = parseInt(req.params.id);
            Session.findByPk(id, {
                include : [
                    {
                        model: SessionMeta,
                        as: "SessionsMeta",

                    },
                    {
                        model: Student,
                        as: 'PresentStudents',
                    },
                    {
                        model: Class,
                        as: "Class",

                        include: [
                            {
                                model: Teacher,
                                as: "Teacher",
                                required: false
                            },
                            // {
                            //     model: ClassMetaData,
                            //     as: "ClassMeta",
                            //     where: {dataType  : "affectedTo"},
                            //     required: false
                            // },
                            {
                                model: Student,
                                where: {
                                    '$Sessions.createdAt$': {  [Op.gt] : Sequelize.col('Class.Students.StudentClasses.createdAt')}
                                },
                                required: false


                            },
                        ],

                    }
                ]
            })
                .then(customer =>
                    res.send({'finalResult': true, 'result': customer})
                )
                .catch(err =>{
                        console.log(err)
                        res.send({'finalResult': false, 'error': err})
                }

                );
        });

        this.getOneByAttribute = router.get('/getOne/:id/:attribute',  async (req, res) => {
            const id = parseInt(req.params.id);
            const attribute = req.params.attribute;
            Session.findByPk(id, {attributes: [attribute]})
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
                let customer = await Session.findByPk(id);
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

        this.searchBy = router.get('/searchBy/:attribute/:key/:op',  async (req, res) => {
            let {attribute, key, op} = req.params;
            switch (op){
                case "like": op  =  seq.Op.like; break;
                case "biggerThan": op  =  seq.Op.like; break;
            }
            let data = {where : { [attribute] : { [seq.Op.like] : '%' + key + '%' } }};
            try{
                let customer = await Session.findAndCountAll(data);
                res.send({'finalResult': true, 'result': customer})
            }catch (e) {
                res.send({'finalResult': false, 'error': e})
            }
        });

        this.delete = router.get('/delete/:id',  async (req, res) => {
            const id = parseInt(req.params.id);
            try {
                let customer = await Session.findByPk(id);
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

        this.test = router.get('/test/',  async (req, res) => {

            Presence.findAll({
                offset: 0,
                limit: 10,
                include : [
                    {model: Student, as: "Student",},
                ]
            })
                .then(Classes =>
                    res.send({'finalResult': true, 'result': Classes})
                )
                .catch(err =>
                    res.send({'finalResult': false, 'error': err})
                );
        });

        this.addMetadata = router.post('/addMetaData',  async (req, res) => {
            let {sessionId, dataType, dataTitle, dataValue} = req.body;
            let validatedData = true;
            let dataError = "";

            if(!validatedData){
                res.send({'finalResult': false,  'error': dataError});
            }else{
                let data = {sessionId, dataType, dataTitle, dataValue};
                try {

                    await SessionMeta.create(data);
                    res.send({'finalResult': true, 'result': true})
                }catch (e) {

                    res.send({'finalResult': false, 'error': e})
                }
            }
        });
    }
}




module.exports = ClassRouters;














