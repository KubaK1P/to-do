import { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem";

function ToDoList() {
    const [toDo, setToDo] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const handleClickAdd = () => {
        const newId = Date.now();
        setToDo(prevToDo => [{ "id": newId, "taskTitle": "", "done": false}, ...prevToDo]);
        
        setEditingId(newId);
    }

    useEffect(() => {
        async function fetchTODOS() {
            const req = await fetch("http://localhost:5000/todos");
            const res = await req.json()
            setToDo(res);
        }

        fetchTODOS();
        
        
    }, []);

    const saveTask = (id, taskTitle) => {
        if (taskTitle.trim() === "") {
            setToDo(toDo.filter(task => task.id !== id));
        } else {
            setToDo(
                toDo.map(task =>
          task.id === id ? { ...task, taskTitle: taskTitle } : task
        ))
            setEditingId(null);
            //tutaj
            async function addReq() {
                await fetch("http://localhost:5000/todos/add", {
                    "headers": { "Content-Type": "application/json" },
                    "body": JSON.stringify({ "id": id, "taskTitle": taskTitle, "done": false }),
                    "method": "POST"
                })
            }
            addReq();
            
        }

    }

    const handleDelete = (id) => {
        setToDo(
            toDo.filter(task => task.id !== id)
        );

        async function delReq() {
                await fetch("http://localhost:5000/todos/del?id=" + id, {
                    "headers": { "Content-Type": "application/json" },
                    "method": "DELETE"
                })
            }
            delReq();
    }

    const handleEdit = (id) => {
        setEditingId(id);
    }

    const handleDone = (id) => {
        setToDo(toDo.map(task => task.id === id ? {...task, done: !(task.done)} : task )
        )
    }

    return (
        <div>
            <button className="addNewToDo" onClick={() => handleClickAdd()}>
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 11C4.44772 11 4 10.5523 4 10C4 9.44772 4.44772 9 5 9H15C15.5523 9 16 9.44772 16 10C16 10.5523 15.5523 11 15 11H5Z" fill="#000000"></path> <path d="M9 5C9 4.44772 9.44772 4 10 4C10.5523 4 11 4.44772 11 5V15C11 15.5523 10.5523 16 10 16C9.44772 16 9 15.5523 9 15V5Z" fill="#000000"></path> </g>
                </svg>
            </button>
            <ul className="toDoList">
                {
                    toDo.map((task) => (
                        <ToDoItem key={task.id} id={task.id} onDelete={handleDelete} onEdit={handleEdit} done={task.done} onDone={handleDone}>
                            {(editingId === task.id) ? (
                                <input
                                    className="tempInput"
                                    autoFocus
                                    defaultValue={task.taskTitle}
                                    onBlur={(e) => saveTask(task.id, e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            saveTask(task.id, e.target.value);
                                        }
                                }}>
                                </input>
                            ): (
                                    <span onClick={() => handleEdit(task.id)}>{task.taskTitle}</span>
                            )}
                            
                        </ToDoItem>
                    ))
                }
            </ul>
        </div>
    );
}

export default ToDoList;