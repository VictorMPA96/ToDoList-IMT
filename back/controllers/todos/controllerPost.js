var Todos = require("../../models/todos")

const createBase = (todo, name) => {
    todo.createdOn = new Date();
    todo.priority = 3;
    todo.status = "uncompleted";
    todo.name = name.trim();
    return todo;
}

const sendToDo = async (req, res, next) => {
    
    try{
        const todo = createBase(req.body, req.body.name);        
        const todoCreate = await Todos.create(todo);        
        return res.status(201).json(todoCreate);
    } catch (error){
        return res.sendStatus(500)
    }
}

exports.sendToDo = sendToDo;
