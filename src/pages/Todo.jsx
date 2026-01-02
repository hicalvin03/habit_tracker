import { useState } from "react";

function FormInput({ newtask, setNewTask, addTask }) {
    return (
        <form onSubmit={addTask}>
            <label htmlFor="task">Enter new habit/task:</label>
            <input 
                type="text" 
                id="task" 
                name="task"
                value={newtask}
                onChange={(event) => setNewTask(event.target.value)} 
            />
            <button type="submit">Submit</button>
        </form>
    );
}

function Todo() {
    const [tasks, setTasks] = useState([]);
    const [newtask, setNewTask] = useState("");

    function addTask(event) {
        event.preventDefault();
        if (newtask.trim() !== "") {
            setTasks([...tasks, newtask]);
            setNewTask("");
        }
    }

    return (
        <div>
            <FormInput 
                newtask={newtask} 
                setNewTask={setNewTask} 
                addTask={addTask} 
            />
        </div>
    );
}

export default Todo;