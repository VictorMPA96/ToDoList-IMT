var Todos = require("../../models/todos");
const { getTodosOrTodosByParams } = require("../../utils/DAO/queries");


const deleteToDo = async (req, res, next) => {

    try {
        await Todos.deleteOne({ _id: req.params.id });        
        const todos =  await getTodosOrTodosByParams();        
        return res.status(200).send(todos)
    } catch (error) {
        return res.sendStatus(500);
    }
}

const deleteAllToDos = async (req, res, next) => {
    
    try{
        const todos = await getTodosOrTodosByParams();
        const ids = todos.map(todo => todo.id);

        if(ids.length >= 1){
            ids.forEach( async (id) => {
                try {
                    await Todos.deleteOne({ _id: id });
                    return res.sendStatus(200);
                } catch (error) {
                    return res.sendStatus(500);
                }
            })
        }else{
            return res.sendStatus(200);
        }
        
    } catch (error) {
        return res.sendStatus(500);
    }
}

exports.deleteToDo = deleteToDo;
exports.deleteAllToDos = deleteAllToDos;




