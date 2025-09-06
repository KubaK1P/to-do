import ToDoList from "./ToDoList";


function Main() {
    
    return (
        <div className="main">
            <main >
                <h2 className="mainHeading">Do zrobienia</h2>
                <h3 className="myTasks">Moje zadania</h3>
                <div>
                    <ToDoList></ToDoList>
                </div>
            </main>
        </div>
    );
}

export default Main;