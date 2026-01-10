import { useState, useEffect } from 'react'
import './App.css'
import TodoPage from './pages/Todo'
import CalendarPage from './pages/Calendar'
import NavButton from './components/navbutton'


function convertToYYYYMMDD(dateObj) { //turn into string "year-month-day"
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function App() {

  //tasks { id, text, checked, active}
  const [tasks, setTasks] = useState(()=>{
      const savedTasks = localStorage.getItem("habits_list");
      return savedTasks ? JSON.parse(savedTasks) : [];
  });

  //history {2026-01-08: {task1,task2,...}}
  const [history, setHistory] = useState(()=>{
      const savedHistory = localStorage.getItem("habits_history")
      return savedHistory ? JSON.parse(savedHistory) : {};
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
        <TodoPage tasks={tasks} setTasks={setTasks} setHistory={setHistory} convertToYYYYMMDD={convertToYYYYMMDD}/>
      ) : (
        <CalendarPage history={history} setHistory={setHistory} convertToYYYYMMDD={convertToYYYYMMDD}/>
      )}

    </>
  )
}

export default App

