var Todos = require("../../models/todos");
const { getTodosOrTodosByParams } = require("../DAO/queries");

exports.idNotFound = async (req, res, next, ) => {  

    try{
        await Todos.findById(req.params.id).exec();
        return next(); 
    } catch {
        return res.sendStatus(404);
    }
};

exports.isEmptyName = (req, res, next, ) => {

    if (req.body.name === undefined){
        return res.sendStatus(400);
    }
    if (req.body.name === '' || typeof(req.body.name) !== 'string'){
        return res.sendStatus(400);
    }
    req.body.name = req.body.name.trim();
    return next();
}


exports.nameIsRepeated = async (req, res, next, ) => {  

    const todos = await getTodosOrTodosByParams({name: req.body.name});

    if (todos.length >= 1){
        return res.sendStatus(409)    
    }
    
    return next();
};


exports.idAlreadyExists = (req, res, next, ) => {  
    const match = todos.find((todo) => todo.name === req.body.name)

    if (match){
        return res.sendStatus(409)    
    }

    return next(); 
};

exports.statusNotCompatible = (req, res, next, ) => {  

    switch(req.body.status !== undefined){
        case (req.body.status === "uncompleted"): {
            return next(); 
        }
        case (req.body.status === "inprogress"): {
            return next(); 
        }
        case (req.body.status === "completed"): {
            return next(); 
        }
        default: {
            return res.sendStatus(400) 
        }
    }
};

exports.priorityNotCompatible= (req, res, next, ) => {  

    const reg = new RegExp('\[1-3]');

    if (req.body.priority && !reg.test(req.body.priority)) {
        return res.sendStatus(400)        
    }
    
    return next(); 
};
