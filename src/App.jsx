import { useState } from 'react'
import './App.css'
import TodoPage from './pages/Todo'
import CalendarPage from './pages/Calendar'
import NavButton from './components/navbutton'

function App() {

  //tasks { id, text, checked, active}
  const [tasks, setTasks] = useState(()=>{
        const savedTasks = localStorage.getItem("habits_list");
        return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [page,setPage] = useState("TodoPage");

  return (
    <>
      <nav className="navbar">
            <span className="nav-logo">Habit Tracker</span>
            <NavButton
              setPage={setPage}
            />
      </nav>  
      {page === "TodoPage" ? (
        <TodoPage tasks={tasks} setTasks={setTasks} />
      ) : (
        <CalendarPage />
      )}

    </>
  )
}

export default App

