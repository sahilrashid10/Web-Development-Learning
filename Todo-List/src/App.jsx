import React, { useState, useEffect, useRef } from "react";
import Navbar from "./assets/components/Navbar";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa"; 
import { MdDelete } from "react-icons/md"; 



function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const isFirstRender = useRef(true);

  // — Load once on mount —
  useEffect(() => {
    const raw = localStorage.getItem("todos");
    if (raw) {
      setTodos(JSON.parse(raw));
    }
  }, []);

  // — Save whenever todos change, but skip the very first render —
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (!todo.trim()) return;
    setTodos(prev => [
      ...prev,
      { id: uuidv4(), todo: todo.trim(), isCompleted: false }
    ]);
    setTodo("");
  };

  const handleCheckBox = e => {
    const id = e.target.name;
    setTodos(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const handleEdit = (e, id) => {
    const item = todos.find(i => i.id === id);
    if (!item) return;
    setTodo(item.todo);
    setTodos(prev => prev.filter(i => i.id !== id));
  };

  const handleDelete = (e, id) => {
    if (window.confirm("Delete this todo?")) {
      setTodos(prev => prev.filter(i => i.id !== id));
    }
  };

  return (
    <>
      <Navbar />
      <main className="md:container mx-auto my-6 p-6 bg-emerald-100 rounded-xl min-h-[80vh] md:w-1/2">
        {/* Add */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Add a Todo</h2>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <input
              type="text"
              value={todo}
              onChange={e => setTodo(e.target.value)}
              placeholder="Enter your task..."
              className="border px-4 py-2 rounded-full w-full sm:w-1/2"
            />
            <button
              onClick={handleAdd}
              className="bg-emerald-900 text-white px-6 py-2 rounded-xl hover:bg-emerald-600 transition"
            >
              Add
            </button>
          </div>
        </section>

        {/* List */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Your Todos</h2>
          {!todos.length && <div>No todos yet ✨.</div>}
          {todos.map(item => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl my-1.5 shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-3/4"
            >
              <div className="flex-1 flex gap-2 min-w-0 items-center">
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={handleCheckBox}
                  name={item.id}
                />
                <span
                  className={item.isCompleted ? "line-through break-words" : "break-words"}
                  style={{
                    wordBreak: 'break-word',
                    overflowWrap: 'anywhere',
                    display: 'block',
                    maxWidth: '100%',
                  }}
                >
                  {item.todo}
                </span>
              </div>
              <div className="flex gap-3 h-full shrink-0 sm:flex-row flex-row w-full sm:w-auto justify-end">
                <button
                  onClick={e => handleEdit(e, item.id)}
                  className="bg-emerald-900 text-white px-4 py-2 rounded-xl hover:bg-emerald-600 transition"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={e => handleDelete(e, item.id)}
                  className="bg-red-700 text-white px-4 py-2 rounded-xl hover:bg-red-800 transition"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}

export default App;
