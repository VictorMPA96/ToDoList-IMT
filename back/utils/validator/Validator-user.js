var Users = require("../../models/users");


const isEmptyStringParam = (req, res, next) => {
    if (req === undefined){
        return res.sendStatus(400);
    }
    if (req === '' || typeof(req) !== 'string'){
        return res.sendStatus(400);
    }
    req = req.trim();
    return next();
}

exports.isEmptyName = (req, res, next) => isEmptyStringParam(req.body.name, res, next);
exports.isEmptyLastname = (req, res, next) => isEmptyStringParam(req.body.lastname, res, next);
exports.isEmptyEmail = (req, res, next) => isEmptyStringParam(req.body.email, res, next);
exports.isEmptyPassword = (req, res, next) => isEmptyStringParam(req.body.password, res, next);

exports.isNotUserRole = (req, res, next) => {

    if(req.body.role !== undefined && req.body.role !== 0){
        return res.sendStatus(401);
    }
    return next();
}

exports.isNotAdminRole = async (req, res, next) => {
    
    try{     
        const decoded = req.decoded;
        if(decoded.role !== 1){
            console.log("NOT AN ADMIN");
            return res.sendStatus(401);
        }        
        return next();
    } catch (error){
        return res.sendStatus(401);
    }
}

