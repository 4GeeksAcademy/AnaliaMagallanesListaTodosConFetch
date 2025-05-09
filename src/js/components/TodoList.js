import React, { useEffect, useState } from "react";
import {
  createUser,
  getTodos,
  addTodo,
  deleteTodo,
  clearTodos
} from "../services/api";

const USER = "analia"; // cambia según lo que te pida el backend

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  const fetchTodos = () => {
    getTodos(USER).then(setTodos);
  };

  useEffect(() => {
    createUser(USER).then(fetchTodos);
  }, []);

  const handleAdd = () => {
    if (!newTask.trim()) return;
    addTodo(USER, newTask).then(() => {
      setNewTask("");
      fetchTodos();
    });
  };

  const handleDelete = (id) => {
    deleteTodo(USER, id).then(fetchTodos);
  };

  const handleClearAll = () => {
    clearTodos(USER).then(() => setTodos([]));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button onClick={handleAdd}>Agregar</button>
      <ul>
        {todos.map(task => (
          <li key={task.id}>
            {task.label}
            <button onClick={() => handleDelete(task.id)}>❌</button>
          </li>
        ))}
      </ul>
      <button onClick={handleClearAll}>Limpiar Todo</button>
    </div>
  );
}
