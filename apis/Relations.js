const db = require("./sqConnection");

const Student = require("../Schemas/Student");
const Session = require("../Schemas/Session");
const SessionMeta = require("../Schemas/SessionMeta");
const Presence = require("../Schemas/Presence");
const ClassSession = require("../Schemas/ClassSession");
const Class = require("../Schemas/Class");
const Teacher = require("../Schemas/Teacher");
const Module = require("../Schemas/Module");
const Level = require("../Schemas/Level");
const ClassType = require("../Schemas/ClassType");
const ClassContract = require("../Schemas/ClassContract");
const ClassMetaData = require("../Schemas/ClassMetaData");
const Payment = require("../Schemas/Payment");
const PaymentMetaData = require("../Schemas/PaymentMetaData");
const LevelModules = require("../Schemas/LevelModules");
const Parent = require("../Schemas/Parent");


const SetRelations = ()=>{

    //Teacher
    Teacher.hasMany(Class, {as : 'Classes', foreignKey : 'teacherId'})
    Parent.hasMany(Student, {as : 'Students', foreignKey : 'parentId'})
    Student.belongsTo(Parent,{foreignKey: 'parentId'})


    Student.belongsToMany(Session, { through: Presence, as: 'PresentSessions' });
    Session.belongsToMany(Student, { through: Presence, as: 'PresentStudents' });


    Student.belongsToMany(Class, { through: 'StudentClasses', as: "Classes", });

    Session.hasMany(SessionMeta);


    SessionMeta.belongsTo(Session, {
        foreignKey: {
            name: 'sessionId'
        }
    });


    Class.belongsToMany(Student, { through: 'StudentClasses' });
    Class.hasMany(ClassMetaData, {as : 'ClassMeta', foreignKey : 'classId'});
    Class.hasMany(ClassSession, {as : 'ClassSession', foreignKey : 'classId'});
    Class.hasMany(Session, {as : 'ClassSessions', foreignKey : 'classId'});
    Class.belongsTo(Teacher, {foreignKey: {name: 'teacherId'}});
    Class.belongsTo(Module, {foreignKey: {name: 'moduleId'}});
    Class.belongsTo(Level, {foreignKey: {name: 'levelId'}});
    Class.belongsTo(ClassType, {foreignKey: {name: 'typeId'}});
    Class.belongsTo(ClassContract, {foreignKey: {name: 'contractId'}});



    ClassMetaData.belongsTo(Class);
    ClassSession.belongsTo(Class);
    Session.belongsTo(Class, {as : 'Class', foreignKey : 'classId'});


    Payment.hasMany(PaymentMetaData, {foreignKey: "paymentId"})

    PaymentMetaData.belongsTo(Payment);


    Module.belongsToMany(Level, { through: LevelModules });
    Level.belongsToMany(Module, { through: LevelModules });
}

db.sync()

module.exports =  SetRelations

