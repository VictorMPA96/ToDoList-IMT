import React, { FC, useEffect, useState } from "react";
import Button from "./mainComponents/formComponents/button";
import Input from "./mainComponents/formComponents/input";
import ToDoList from "./mainComponents/listComponents/todolist";
import Modal from "./mainComponents/modal";
import styles from "./main.module.css"
import Toast from "./mainComponents/toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';
import store, { RootState } from "../app/store";
import { thunkDeleteTodo, thunkGetTodos, thunkPostTodo, thunkSortTodos, thunkUpdateTodo } from "../app/thunks";


export interface ToDo {
    _id?: string;
    name?: string;
    status?: string;
    priority?: number;
}

const Main: FC = () => {

    const todosUS: ToDo[] = useSelector((state: RootState) => state.todos);
    const toastConfigUS = useSelector((state: RootState) => state.toastConfig);

    const [task, setTask] = useState<string>("");
    const [sort, setSort] = useState<number>(3);
    const [nameState, setNameState] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const [_id, setId] = useState<string>("");
    const [checkAllBtnText, setCheckAllBtnText] = useState<string>("");

    const getTodosAndChangeTextStatusBtn =  async () => {
        await store.dispatch(thunkGetTodos);
        changeCheckAllBtn()
    }

    useEffect(() => {
        getTodosAndChangeTextStatusBtn()        
    }, []);

    const postToDo = (todoParams?: ToDo | Array<ToDo>) => {
        store.dispatch(thunkPostTodo(todoParams));
        setTask("");
    }

    const addTask = () => {

        const todo: ToDo = {
            name: task,
            status: "uncompleted",
            priority: 3
        }

        postToDo(todo);
    }

    const deleteTask = () => {

        const todos = store.getState().todos;
        const completedTasks = todos.filter((task: ToDo) => task.status === "completed");
        const idsTasksToDelete = completedTasks.map((task) => task._id);

        idsTasksToDelete.forEach((_id) => {
            store.dispatch(thunkDeleteTodo(_id));            
        })
    }

    const modifyToDo = (idTodo?: string, todoParams?: ToDo) => {
        store.dispatch(thunkUpdateTodo(idTodo, todoParams));
    }


    const toggle = (_id: string) => {

        const todos = store.getState().todos;

        const todoIndex = todos.findIndex((todo) => todo._id === _id);

        const todoStatus =
            todos[todoIndex].status === "uncompleted" ? "inprogress" :
            todos[todoIndex].status === "inprogress" ? "completed" : "uncompleted"
        ;

        todos[todoIndex].status = todoStatus;

        modifyToDo(_id, { "status": todoStatus })

        changeCheckAllBtn();
    }

    const fnShowModal = (_id: string) => {
        setId(_id);
        setShow(!show);
    }

    const onClickEdit = () => {
        modifyToDo(_id, { "name": nameState });
        setNameState("");
        setShow(!show);
    }

    const cancelEdit = () => {
        setShow(!show);
        setNameState("");
    }

    const findCheckedTasks = () => {
        let completedTasks = store.getState().todos.filter(todo => todo.status === "completed");
        return completedTasks;
    }

    const fnCheckAllTasks = () => {
        
        let todos = store.getState().todos;        

        const changeCompletedStatus = (state: string) => {
            todos.forEach((task) => {
                task.status = state;
                modifyToDo(task._id, { "status": state }); 
            })
        }

        let CheckedTasks = findCheckedTasks();

        if (CheckedTasks.length === store.getState().todos.length) {
            changeCompletedStatus("uncompleted");
        } else if (CheckedTasks.length > store.getState().todos.length / 2) {
            changeCompletedStatus("uncompleted");
        } else {
            changeCompletedStatus("completed");
        }

        if (CheckedTasks.length === 0) {
            changeCompletedStatus("completed");
        }
    }

    const changeCheckAllBtn = () => {

        let todosCompleted = findCheckedTasks();

        if (todosCompleted.length === store.getState().todos.length) {
            setCheckAllBtnText("CHECK ALL TASKS AS UNCOMPLETED");
        } else if (todosCompleted.length > store.getState().todos.length / 2) {
            setCheckAllBtnText("CHECK ALL TASKS AS UNCOMPLETED");
        } else {
            setCheckAllBtnText("CHECK ALL TASKS AS COMPLETED");
        }

        if (todosCompleted.length === 0) {
            setCheckAllBtnText("CHECK ALL TASKS AS COMPLETED");
        }

    }

    const handlePriority = (_id: string, todos: ToDo[]) => {
              

        const todoIndex = todosUS.findIndex((todo) => todo._id === _id);       

        const numPriority =
            todosUS[todoIndex].priority === 3 ? 2 :
            todosUS[todoIndex].priority === 2 ? 1 : 3
        ;       

        modifyToDo(_id, { "priority": numPriority })
        

        
    }

    const sortTasks = () => {
        const lowPriorityTasks = store.getState().todos.filter((task) => task.priority === 3);
        const moderatePriorityTasks = store.getState().todos.filter((task) => task.priority === 2);
        const urgentPriorityTasks = store.getState().todos.filter((task) => task.priority === 1);

        sort === 3 ? setSort(1) : setSort(3)

        let sortedTasks: Array<ToDo> = [];

        if (sort === 1) {

            urgentPriorityTasks.forEach((task) => sortedTasks.push(task));
            moderatePriorityTasks.forEach((task) => sortedTasks.push(task));
            lowPriorityTasks.forEach((task) => sortedTasks.push(task));

            store.dispatch(thunkSortTodos(sortedTasks));
        }

        if (sort === 3) {

            lowPriorityTasks.forEach((task) => sortedTasks.push(task));
            moderatePriorityTasks.forEach((task) => sortedTasks.push(task));
            urgentPriorityTasks.forEach((task) => sortedTasks.push(task));

            store.dispatch(thunkSortTodos(sortedTasks));
        }

    }




    return (
        <main>
            <section className={styles.head}>
                <Input _id="inputAddTask" text="" placeholder="WRITE A TASK" value={`${task}`} onChange={(text: string) => setTask(text.toUpperCase())} />
                <div className={styles.adddelBtnsContainer}>
                    <Button className={styles.addBtn} type="outline-success" _id="buttonAddTask" text="ADD NEW TASK" onClick={addTask} />
                    <Button className={styles.delBtn} type="outline-danger" _id="buttonDeleteTask" text="DELETE COMPLETED TASKS" onClick={deleteTask} />
                </div>
                <div className={styles.checksortBtnsContainer}>
                    <Button className={styles.checkAllBtn} type="outline-light" _id="buttonDeleteTask" text={`${checkAllBtnText}`} onClick={() => { fnCheckAllTasks(); changeCheckAllBtn(); }} />
                    <FontAwesomeIcon
                        icon={faSort}
                        className={styles.sortBtn}
                        onClick={sortTasks}
                    />
                </div>
                <div className={styles.listContainer}>
                    <ToDoList
                        todos={todosUS}
                        onClick={(_id: string) => toggle(_id)}
                        onClickEdit={(_id: string) => fnShowModal(_id)}
                        handlePriority={(_id: string, todos: ToDo[]) => handlePriority(_id, todos)}
                    />
                </div>

                <Toast bg={toastConfigUS.toastBG} showBoolean={store.getState().toastConfig.toastShow}  fn={() => store.dispatch({ type: "todos/setToast", payload: {showOff: false}})} text={toastConfigUS.toastInfo} />

                {show === true
                    ? (
                        <Modal _id="modalID" content={
                            <React.Fragment>
                                <div>
                                    <Input _id="nameInput" text="Name:" placeholder="Change name" value={`${nameState}`} onChange={(text: string) => setNameState(text.toUpperCase())} />
                                </div>
                                <hr />
                                <div className={styles.modalBtnsContainer}>
                                    <div>
                                        <Button type="outline-primary" _id="editBtn" text="CHANGE" onClick={onClickEdit} />
                                    </div>
                                    <div>
                                        <Button type="outline-danger" _id="editBtn" text="CANCEL" onClick={cancelEdit} />
                                    </div>
                                </div>
                            </React.Fragment>
                        } />
                    )
                    : null

                }

            </section>
        </main>
    )
}

export default Main;