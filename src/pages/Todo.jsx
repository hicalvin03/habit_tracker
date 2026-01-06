import { useState, useEffect, useRef} from "react";
import './Todo.css'
import CustomCheckBox from "../components/checkbox"
import SubmitButton from "../components/button"
import DeleteButton from "../components/deletebutton"
import NoFace from "../components/nofaceAnimation"

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

function TaskItem({tasks,deleteTask,updateCheck}){ //Responsible for displaying each task item.
    return(
        tasks.map((task)=> 
            <li key={task.id}>
                <CustomCheckBox
                    id={task.id}
                    updateCheck={updateCheck}
                    checked={task.checked}
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
function TodoPage({tasks,setTasks}) {

    const [newtask, setNewTask] = useState("");
    const [currImage, setCurrentImage] = useState("lookbackmorning.PNG")

    const AnimationRef = useRef();
    const prevTasksRef = useRef(tasks);

    useEffect(() => {
        localStorage.setItem("habits_list", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(()=> { //If a new checkbox is ticked play animation
        const prevTasks = prevTasksRef.current ?? [];
        
        const numPrevChecked = prevTasks.filter((prevTask)=>
            prevTask.checked
        )
        const numCurrentchecked = tasks.filter((task)=>
            task.checked
        )
        if (numCurrentchecked.length > numPrevChecked.length){
            AnimationRef.current.play()
        }
        
        prevTasksRef.current = tasks

    }, [tasks]);

    useEffect(()=> { //changes image based on time
        const hour = new Date().getHours()
        if (hour < 12){
            setCurrentImage("./lookbackmorning.PNG")
        } else if (hour < 18){
            setCurrentImage("./lookbackafternoon.png")
        }
        else {
            setCurrentImage("./lookbacknight.png")
        }
    }, []);
            
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

    function updateCheck(taskid){
        setTasks((prevTasks)=>
            prevTasks.map((task)=>
                task.id==taskid?{...task, checked: !task.checked}:task
            ))
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
                    updateCheck={updateCheck}
                    />
                </ol>
            </div>

            <div className="rightsideBar">
                <div className="lookbackImage">
                    <img src={currImage} alt="Lookback" />
                </div>
                <NoFace
                    AnimationRef={AnimationRef}
                />
                <span>Do a task to make him happy!</span>
            </div>

        </div>
    
    );
}

export default TodoPage;