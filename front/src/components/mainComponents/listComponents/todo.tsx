import React, { FC } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faCertificate } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import styles from "./todo.module.css";
import Button from "../formComponents/button";
import { ToDo } from "../../main";




interface ITodoProps {
    _id?: string;
    status?: string;
    name?: string;
    onClick: (_id: string) => void;  
    onClickEdit: (_id: string) => void; 
    handlePriority: (_id: string, todos: ToDo[]) => void;   
    priority?: number;    
    arrToDos: ToDo[];
}


const Todo: FC<ITodoProps> = ({ _id, status, name, onClick, onClickEdit, priority, handlePriority, arrToDos}) => {   
    
    
    return (

        <React.Fragment>
            <ListGroupItem
                as="li"
                className={`${status === "completed" ? styles.liChecked : styles.liNoChecked}`}  
                id={"li"+`${_id}`}
            >       
                <div className={styles.priorityAndStatusContainer}>
                    <FontAwesomeIcon 
                        icon={faCertificate} 
                        className={` ${ priority === 1 ? styles.priorityUrgent : priority === 2 ? styles.priorityModerate : styles.priorityLow}`} 
                        onClick={() => _id !== undefined && arrToDos !== undefined && handlePriority(_id, arrToDos)}
                    />  
                    <Button 
                        className={styles.statusBtn} 
                        type={`${status === "uncompleted" ? "outline-light" : status === "inprogress" ? "outline-success" : "outline-danger"}`} 
                        _id={`${_id}`} 
                        text={`${status === "uncompleted" ? "UNCOMPLETED" : status === "inprogress" ? "INPROGRESS" : "COMPLETED"}`} 
                        onClick={() => _id !== undefined && onClick(_id)} 
                    />          
                </div>      
                <div className={`${status === "completed" ? styles.checked :  styles.noChecked}`}>{name}</div>  
                <FontAwesomeIcon className={styles.editIcon} icon={faPenToSquare} onClick={() => _id !== undefined && status !== "completed" && onClickEdit(_id)} id={`${_id}`}/>
            </ListGroupItem>            
        </React.Fragment>
        
    );

}

// interface ITodoProps2 {
//     todo: ToDo;
//     onClick: () => void;
// }


// const Todo2: FC<ITodoProps2> = ({todo, onClick}) => (
//     <li _id={`${todo._id}`} onClick={onClick}>
//         <input type="text" _id={`${todo._id}`} checked={todo.completed}/>
//         <label htmlFor={`${todo._id}`}>{todo.name}</label>
//     </li>
// );

export default Todo;