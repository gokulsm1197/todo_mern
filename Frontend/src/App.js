import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:5000/todos');
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addOrUpdateTodo = async () => {
    if (editId) {
      await axios.put(`http://localhost:5000/todos/${editId}`, { text });
      setEditId(null);
    } else {
      await axios.post('http://localhost:5000/todos', { text });
    }
    setText('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    fetchTodos();
  };

  const startEdit = (todo) => {
    setText(todo.text);
    setEditId(todo._id);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Todo List</h2>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo"
      />
      <button onClick={addOrUpdateTodo}>{editId ? 'Update' : 'Add'}</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text}
            <button onClick={() => startEdit(todo)}>Edit</button>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
