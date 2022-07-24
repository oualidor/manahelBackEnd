const jwt  = require('jsonwebtoken');

function authAdmin(req, res, next){
    console.log(req.body);

    const authHead = req.headers['authorization'];
    console.log(authHead)
    const token = authHead && authHead.split(' ')[1];
    if(token == null){
        console.log("null tokken");
        res.send({finalResult: false, error: "UnAuthorised"});
    } else {
        jwt.verify(token, "walid", (err, data) => {
            if (err) res.send({finalResult: false, error: err});
            if(data.userType == "Admin"){
                req.body.email  = data.email;
                req.body.userType = data.userType;
                next()
            }else{
                res.send({finalResult: false, error: "UnAuthorised"});
            }
        })
    }
}

function authCustomer(req, res, next){
    const authHead = req.headers['authorization'];
    const token = authHead && authHead.split(' ')[1];
    if(token == null){
        console.log("null tokken");
        res.sendStatus(401);
    }else{
        jwt.verify(token, "lkjlfngrpgjefvml,s:;vnsomvfijv", (err, data) => {
            if (err) res.sendStatus(403);
            if(data.userType == "Customer"){
                req.body.email  = data.email;
                req.body.userType = data.userType;
                next()
            }else{
                res.sendStatus(403)
            }
        })
    }
}


module.exports = {authAdmin, authCustomer};
