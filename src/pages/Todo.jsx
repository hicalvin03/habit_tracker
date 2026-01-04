import { useState, useEffect} from "react";
import './Todo.css'
import CustomCheckBox from "../components/checkbox"
import SubmitButton from "../components/button"
import DeleteButton from "../components/deletebutton"

function FormInput({ newtask, setNewTask, addTask }) {
    return (
        <form className="form" onSubmit={addTask}>
            <input 
                type="text" 
                id="task" 
                name="task"
                value={newtask}
                onChange={(event) => setNewTask(event.target.value)} 
                placeholder="Enter new habit/task"
            />
            <SubmitButton/>
        </form>
    );
}

function TaskItem({tasks,deleteTask}){ //Responsible for displaying each task item.
    return(
        tasks.map((task)=> 
            <li key={task.id}>
                <CustomCheckBox
                    id={task.id}
                />
                <span className="task-text">{task.text}</span>
                <DeleteButton
                    taskid={task.id}
                    deleteTask={deleteTask}
                />
            </li>)
    )
}

//tasks { id, text, checked, active}

function TodoPage() {
    const [tasks, setTasks] = useState(()=>{
        const savedTasks = localStorage.getItem("habits_list");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [newtask, setNewTask] = useState("");

    useEffect(() => {
        localStorage.setItem("habits_list", JSON.stringify(tasks));
    }, [tasks]);


    function addTask(event) {
        event.preventDefault();
        if (newtask.trim() !== "") {
            setTasks([
                ...tasks,
                {
                    id: crypto.randomUUID(), //unique id to every task
                    text: newtask,
                    checked: false,
                    active: true
                }
                ]);

            setNewTask("");
        }
    }

    function deleteTask(taskid){
        setTasks(tasks.filter((task)=>taskid!==task.id))
    }

    return (
    
        <div className="todopage">
            <div className="todo">
                <h1 className="Title">Habits List:</h1>
                <FormInput 
                    newtask={newtask} 
                    setNewTask={setNewTask} 
                    addTask={addTask} 
                />
                <ol id="tasks-list">
                    <TaskItem 
                    tasks={tasks}
                    deleteTask={deleteTask}
                    />
                </ol>
            </div>

            <div className="lookbackImage">
                <img src="/lookback night.png" alt="Lookback" />
            </div>
        </div>
    
    );
}

export default TodoPage;