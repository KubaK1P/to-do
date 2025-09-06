import ToDoList from "./ToDoList";


function Main() {
    
    return (
        <div className="main">
            <main >
                <h2 className="mainHeading">Fresh Cement</h2>
                <h3 className="myTasks">My Tasks</h3>
                <div>
                    <ToDoList></ToDoList>
                </div>
            </main>
        </div>
    );
}

export default Main;