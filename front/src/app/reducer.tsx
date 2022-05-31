import { ToDo } from "../components/main";

export interface ITodosProps{
    todos: ToDo[],
    toastConfig: {
        toastBG: string,
        toastInfo: string,
        toastShow: boolean
    }  
}

const initialState: ITodosProps = {
    todos: [],
    toastConfig: {
        toastBG: "",
        toastInfo: "",
        toastShow: false
    }    
}

function rootReducer(state: ITodosProps  = initialState , action: any): ITodosProps {
    switch (action.type) {
        case "todos/getTodos": {
            return {...state,todos:action.payload}
        }
        case "todos/postTodos": {
            const newTodos = [...state.todos, action.payload];   
            return {...state,todos:newTodos}
        }
        case "todos/deleteTodos": {
            return {...state,todos:action.payload}
        }
        case "todos/updateTodos": {
            const idTodo = action.payload._id;
            const newToDo = action.payload.newTodo;
            
            const matchIndex = state.todos.findIndex((task: ToDo) => task._id === idTodo);

            const newTasks = [...state.todos.filter(todo => todo._id !== idTodo)]
            newTasks.splice(matchIndex, 0, newToDo);
            
            return {...state,todos:newTasks}
        }
        case "todos/saveTodos": {
            return {...state,todos:action.payload}
        }
        case "todos/setToast": {
            const statusCode = action.payload.status;
            const actionReq = action.payload.action;
            const showOff = action.payload.showOff;

            const newToast = {
                toastBG: "",
                toastInfo: "",
                toastShow: false
            }

            if (statusCode === 201){
                newToast.toastBG = "success";
                newToast.toastInfo = "Task added correctly.";
                newToast.toastShow = true;
            }

            if (statusCode === 200){
                newToast.toastBG = "success";                
                newToast.toastShow = true;

                actionReq === "UPDATE" ? newToast.toastInfo = "Task modified correctly." :
                newToast.toastInfo = "Task deleted correctly."
            }            

            if (statusCode === 400){
                newToast.toastBG = "danger";
                newToast.toastInfo = "Error: Empty task.";
                newToast.toastShow = true;
            }

            if (statusCode === 409){
                newToast.toastBG = "warning";
                newToast.toastInfo = "Error: This task already exists.";
                newToast.toastShow = true;
            }

            if (showOff !== undefined){
                newToast.toastShow = showOff;
            }

            return {...state, toastConfig:newToast};
        }
      
      default:
        return state;
    }
}

export default rootReducer;