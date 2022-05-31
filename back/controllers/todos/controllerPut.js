var Todos = require("../../models/todos")

const updateToDo = async (req, res, next) => {

    try {
        const match = await Todos.findById(req.params.id).exec();
        const request = req.body;

        if (!request.id || request.id) {
            request.id = match.id;
        }

        if (request.name === undefined) {
            request.name = match.name;
        }

        if (request.status === undefined) {
            request.status = match.status;
        }

        if (request.priority === undefined) {
            request.priority = match.priority;
        }

        if (!request.createdOn || request.createdOn) {
            request.createdOn = match.createdOn;            
        }

        if (!request.updateAt || request.updateAt) {
            request.updateAt = new Date();
        }

        await Todos.findByIdAndUpdate(req.params.id, request);
        const newTodo = await Todos.findById(req.params.id);
        return res.status(200).send(newTodo);

    } catch (error) {
        return res.sendStatus(500)
    }
    
}

exports.updateToDo = updateToDo;



