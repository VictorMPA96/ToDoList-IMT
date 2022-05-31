var Todos = require("../../models/todos")
const { getTodosOrTodosByParams } = require("../../utils/DAO/queries")

const getToDos = async (req, res, next) => {

    try {
        const todos = await getTodosOrTodosByParams();
        return res.status(200).json(todos)
    } catch (error) {
        throw error;
    }

}

const getToDo = async (req, res, next) => {

    try {
        const todo = await Todos.findById(req.params.id).exec();
        return res.status(200).json(todo)
    } catch (error) {
        return res.sendStatus(500)
    }
}

exports.getToDo = getToDo;
exports.getToDos = getToDos;


