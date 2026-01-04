import { useState } from 'react'
import './App.css'
import TodoPage from './pages/Todo' // Adjust path if your file is named Todo.jsx

function App() {
  return (
    <>
      <nav className="navbar">
            <span className="nav-logo">Habit Tracker</span>
      </nav>
      <TodoPage />
    </>
  )
}

export default App

