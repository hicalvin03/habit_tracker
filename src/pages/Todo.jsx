import { useState, useEffect, useRef} from "react";
import './Todo.css'
import CustomCheckBox from "../components/checkbox"
import SubmitButton from "../components/button"
import DeleteButton from "../components/deletebutton"
import NoFace from "../components/nofaceAnimation"

//Imports for sortablelist/dragging of items
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

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

export function SortableTaskItem({id,children}){
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: id});
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    
    return (
        <li ref={setNodeRef} style={style}>
            <span className="drag-handle" {...attributes} {...listeners}>
                ✏️
            </span>
            {children}
        </li>
    );

}

function TaskItem({tasks,deleteTask,updateCheck}){ //Responsible for displaying each task item.
    return(
        tasks.map((task)=> 
            <SortableTaskItem key={task.id} id={task.id}>
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
            </SortableTaskItem>
        )
    )
}

//tasks { id, text, checked, active}
function TodoPage({tasks,setTasks,setHistory,convertToYYYYMMDD}) {

    const [newtask, setNewTask] = useState("");
    const [currImage, setCurrentImage] = useState("lookbackmorning.PNG")

    //Sensors for dragging
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    //function used for dragging events.
    function handleDragEnd(event) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setTasks((tasks) => {
            const oldIndex = tasks.findIndex(t => t.id === active.id);
            const newIndex = tasks.findIndex(t => t.id === over.id);
            return arrayMove(tasks, oldIndex, newIndex);
        });
    }

    const AnimationRef = useRef();
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

        const taskToUpdate = tasks.find(t => t.id === taskid);
        
        if (taskToUpdate && !taskToUpdate.checked) {
            AnimationRef.current?.play();

            setHistory((prevHistory) => {
                const today = convertToYYYYMMDD(new Date());
                const existingTasks = prevHistory[today] || [];

                return {...prevHistory, [today]: [...existingTasks, taskToUpdate.text]};
            });
        }

        setTasks(prevTasks => prevTasks.map(task => 
            task.id === taskid? { ...task, checked: !task.checked }: task
        ));
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
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={tasks.map(t => t.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <ol id="tasks-list">
                            <TaskItem
                                tasks={tasks}
                                deleteTask={deleteTask}
                                updateCheck={updateCheck}
                            />
                        </ol>
                    </SortableContext>
                </DndContext>
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