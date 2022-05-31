import axios from "axios";
import { ToDo } from "../components/main";

export const thunkGetTodos = async (dispatch: any, getState: any) => {
    
    try {
        const response = await axios.get('http://localhost:3000/api/tasks');                
        dispatch({
            type: "todos/getTodos", 
            payload: response.data
        });
    } catch (error) {
        console.log("Error: ",error);
    }
}

export const thunkPostTodo = (params: any) => async (dispatch: any, getState: any) => {

    try{
        const response = await axios.post('http://localhost:3000/api/tasks', params);
        dispatch({
            type: "todos/postTodos", 
            payload: response.data
        })
        dispatch({ type: "todos/setToast", payload: {status: response.status, action: "CREATE"}})
    }catch (error: any) {
        console.log("Error: ",error);
        dispatch({type: "todos/setToast", payload: {status: error.response.status, action: "CREATE"}})
    }
}

export const thunkDeleteTodo = (_id: any) => async (dispatch: any, getState: any) => {

    try {
        const response = await axios.delete('http://localhost:3000/api/tasks/' + _id);
        dispatch({
            type: "todos/deleteTodos", 
            payload: response.data
        });
        dispatch({ type: "todos/setToast", payload: {status: response.status, action: "DELETE"}})
    } catch (error: any) {
        console.log("Error: ",error);
        dispatch({ type: "todos/setToast", payload: {status: error.response.status, action: "DELETE"}})   
    }
}

export const thunkUpdateTodo = (_id: any, newParams?: ToDo) => async (dispatch: any, getState: any) => {

    try {
        const response = await axios.put('http://localhost:3000/api/tasks/' + _id, newParams);
        dispatch({
            type: "todos/updateTodos", 
            payload: {
                _id: _id,
                newTodo: response.data
            }
        });
        dispatch({ type: "todos/setToast", payload: {status: response.status, action: "UPDATE"}})
    } catch (error: any) {
        console.log("Error: ",error);
        dispatch({ type: "todos/setToast", payload: {status: error.response.status, action: "UPDATE"}})
    }
}

export const thunkSortTodos = (params: ToDo[]) => async (dispatch: any, getState: any) => {
    try {       
        dispatch({
            type: "todos/saveTodos", 
            payload: params
        });   
    } catch (error) {
        console.log("Error: ",error);       
    }
}




    
    