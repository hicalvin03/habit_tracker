import { useState } from 'react'
import './App.css'
import Todo from './pages/Todo' // Adjust path if your file is named Todo.jsx

function App() {
  return (
    <>
      {/* This now renders your Todo component from the pages folder */}
      <Todo />
    </>
  )
}

export default App

