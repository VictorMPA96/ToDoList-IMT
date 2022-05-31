import React, { FC } from "react";
import { ToDo } from "../../main";
import Todo from "./todo";
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';

interface IToDoListProps {
    todos: ToDo[];
    onClick: (_id: string) => void;
    onClickEdit: (_id: string) => void;
    handlePriority: (_id: string, todos: ToDo[]) => void;
}

const ToDoList: FC<IToDoListProps> = ({todos,  onClick, onClickEdit, handlePriority}) => {

    return (

        <ListGroup>
            {todos.map((todo:ToDo, index) => <Todo                
                key={todo._id}  
                _id={todo._id} 
                name={todo.name} 
                status={todo.status} 
                onClick={(_id: string)=> onClick(_id)}  
                onClickEdit={(_id: string)=> onClickEdit(_id)}
                priority={todo.priority}    
                handlePriority={(_id: string, todos: ToDo[])=> handlePriority(_id, todos)}  
                arrToDos={todos}                                  
            />)}
        </ListGroup>
        
    );
}

export default ToDoList;