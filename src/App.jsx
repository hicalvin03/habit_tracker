import { useState, useEffect } from 'react'
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

  const [history,setHistory] = useState(()=>{
      const savedHistory = localStorage.getItem("habits_hitsory")
      return savedHistory ? Json.parse(savedHistory) : {};
  });
  
  const [page,setPage] = useState("TodoPage");

  useEffect(() => {
          localStorage.setItem("habits_list", JSON.stringify(tasks));
      }, [tasks]);

  useEffect(() => {
          localStorage.setItem("habits_history", JSON.stringify(history));
      }, [history]);

  return (
    <>
      <nav className="navbar">
            <span className="nav-logo">Habit Tracker</span>
            <NavButton
              setPage={setPage}
            />
      </nav>  
      {page === "TodoPage" ? (
        <TodoPage tasks={tasks} setTasks={setTasks} setHistory={setHistory} />
      ) : (
        <CalendarPage />
      )}

    </>
  )
}

export default App

