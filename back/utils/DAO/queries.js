var Todos = require("../../models/todos");
var Users = require("../../models/users");


const getTodosOrTodosByParams = async (filter) => {
    try {
        const localFilter = filter ? filter : {};
        const todos = await Todos.find(localFilter).exec();
        
        return todos;
    } catch (error) {
        throw error;
    }
}

const getUsersOrUsersByParams = async (filter) => {
    try {
        const localFilter = filter ? filter : {};
        const users = await Users.find(localFilter, "_id name lastname email username createdOn updateAt role").exec();
        
        return users;
    } catch (error) {
        throw error;
    }
}

exports.getTodosOrTodosByParams = getTodosOrTodosByParams;
exports.getUsersOrUsersByParams = getUsersOrUsersByParams;
