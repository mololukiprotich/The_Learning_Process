import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

function App() {
  type Task = {
  id: number;
  text: string;
  createdAt: Date;
  done: boolean;
};

const [tasks, setTasks] = useState<Task[]>([]);
const [newTask, setNewTask] = useState('');

useEffect(() => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    setTasks(JSON.parse(savedTasks));
  }
}, []);


useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

const addTask = () => {
  if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, createdAt: new Date(), done: false }]);
    setNewTask('');
  };

  const toggleTaskCompletion = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });

  return (
    <>
      <div className="overlay">
        <div>
          <p className="heading"><h1>To Do List</h1></p>
        </div>

        <div className="to-do-container">
          <div className="input-wrapper">
            <input type="text" placeholder="Add a new task" value={newTask} onChange={(e) => setNewTask(e.target.value)} className="task-input" />
            <button className="add-button" onClick={addTask}><img src="src/assets/add-icon.svg" width = "30px" alt="add-icon" /></button>
          </div>

          <ul className="task-list">
            {tasks.length === 0 ? (
              <p>No tasks yet</p>
            ) : (
              tasks.map((task) => (
                <li className="task-item" key={task.id}>
                  <div className="task">
                    <input type="checkbox" className="task-checkbox" checked={task.done} onChange={() => toggleTaskCompletion(task.id)} />
                    <span className={`task-text ${task.done ? "done" : ""}`}>{task.text}</span>
                    <span className="task-date">{task.createdAt.toLocaleDateString()}</span>
                    <button className="delete-button" onClick={() => deleteTask(task.id)}><img src="src/assets/delete-icon.svg" width="30px" alt="delete-icon" /></button>
                  </div>
              </li>
            )))}
          </ul>

        </div>
      </div>
    </>
  )
}

export default App
