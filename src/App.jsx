import React, { useState, useEffect } from 'react';

    const App = () => {
      const [todos, setTodos] = useState([]);
      const [newTodo, setNewTodo] = useState('');

      useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos'));
        if (savedTodos) {
          setTodos(savedTodos);
        }
      }, []);

      useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
      }, [todos]);

      const addTodo = () => {
        if (newTodo.trim() !== '') {
          setTodos([...todos, { text: newTodo, completed: false }]);
          setNewTodo('');
        }
      };

      const deleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
      };

      const toggleComplete = (index) => {
        const newTodos = todos.map((todo, i) =>
          i === index ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(newTodos);
      };

      return (
        <div>
          <h1>Todo App</h1>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
          />
          <button onClick={addTodo}>Add Todo</button>
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(index)}
                />
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.text}
                </span>
                <button onClick={() => deleteTodo(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      );
    };

    export default App;
