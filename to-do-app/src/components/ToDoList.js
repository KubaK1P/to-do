import { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem";

function ToDoList() {
    const [toDo, setToDo] = useState([]);
    const [editingId, setEditingId] = useState(null);

    // fetch all task data that exists on the backend
    useEffect(() => {
        async function fetchTODOS() {
            try {
                const res = await fetch("http://localhost:5000/todos");
                const data = await res.json()
                if (!data.ok) {
                    console.error("Server error", data.error);
                }
                setToDo(data);
            }
            catch (err) {
                console.error("Network error", err);
            }
            
        }

        fetchTODOS();
    }, []);

    // adds a new task in the editing state
    const handleClickAdd = () => {
        const newId = Date.now();
        setToDo(prevToDo => [{ "id": newId, "taskTitle": "", "done": false}, ...prevToDo]);
        
        setEditingId(newId);
    }

    // actually save the task in the ToDO and in python
    const saveTask = async (id, taskTitle) => {
        if (taskTitle.trim() === "") {
            setToDo(toDo.filter(task => task.id !== id));
        } else {
            setToDo(
                toDo.map(task =>
          task.id === id ? { ...task, taskTitle: taskTitle } : task
        ))
            setEditingId(null);
            //tutaj
            try {
                const res = await fetch("http://localhost:5000/todos/add", {
                    "headers": { "Content-Type": "application/json" },
                    "body": JSON.stringify({ "id": id, "taskTitle": taskTitle, "done": false }), // todo: after editing a "done": true task, it becomes undone on the backend
                    "method": "POST"
                });
                const data = res.json();

                if (!data.ok) {
                    console.error("Server error", data.error);
                }
            } catch (err) {
                console.error("Network error", err);
            }  
        }
    }

    // deletes a task based on id
    const handleDelete = async (id) => {
        setToDo(
            toDo.filter(task => task.id !== id)
        );

        try {
            const res = await fetch(`http://localhost:5000/todos/del?id=${id}`, {
                "headers": { "Content-Type": "application/json" },
                "method": "DELETE"
            })
            const data = res.json()

            if (!data.ok) {
                    console.error("Server error", data.error);
            }

        } catch (err) {
            console.error("Network error", err);
        }
            
    }

    // puts the specified task into editing state
    const handleEdit = (id) => {
        setEditingId(id);
    }

    // toggles the task's "done" value
    const handleDone = async (id) => {
        setToDo(toDo.map(task => task.id === id ? {...task, done: !(task.done)} : task )
        )

        try {
            const res = await fetch(`http://localhost:5000/todos/done?id=${id}`, {
                "headers": { "Content-Type": "application/json" },
                "method": "PATCH"
            });
            const data = res.json()
            
            if (!data.ok) {
                 console.error("Server error", data.error);
            }

        } catch (err) {
            console.error("Network error", err);
        }
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