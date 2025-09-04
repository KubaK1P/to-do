import { useState } from "react";
import ToDoItem from "./ToDoItem";

function ToDoList() {
    const [toDo, setToDo] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const handleClickAdd = () => {
        const newId = Date.now();
        setToDo(prevToDo => [...prevToDo, { "id": newId, "taskTitle": "" }]);
        
        setEditingId(newId);
    }

    const saveTask = (id, taskTitle) => {
        if (taskTitle.trim() === "") {
            setToDo(toDo.filter(task => task.id !== id));
        } else {
            setToDo(
                toDo.map(task =>
          task.id === id ? { ...task, taskTitle: taskTitle } : task
        ))
            setEditingId(null);
        }

    }

    const handleDelete = (id) => {
        setToDo(
            toDo.filter(task => task.id !== id)
        );
    }

    const handleEdit = (id) => {
        setEditingId(id);
    }

    return (
        <div>
            <button className="addNewToDo" onClick={() => handleClickAdd()}><svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 11C4.44772 11 4 10.5523 4 10C4 9.44772 4.44772 9 5 9H15C15.5523 9 16 9.44772 16 10C16 10.5523 15.5523 11 15 11H5Z" fill="#000000"></path> <path d="M9 5C9 4.44772 9.44772 4 10 4C10.5523 4 11 4.44772 11 5V15C11 15.5523 10.5523 16 10 16C9.44772 16 9 15.5523 9 15V5Z" fill="#000000"></path> </g></svg></button>
            <ul>
                {
                    toDo.map((task) => (
                        <ToDoItem key={task.id} id={task.id} onDelete={handleDelete} onEdit={handleEdit}>
                            {(editingId === task.id) ? (
                                <input
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
                                    <span>{task.taskTitle}</span>
                            )}
                            
                        </ToDoItem>
                    ))
                }
            </ul>
        </div>
    );
}

export default ToDoList;