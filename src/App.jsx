import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, {text: newTask, completed: false}]);
      setNewTask('');
    }
  };

  const toggleTask = (index) => {
    setTasks(
      tasks.map((task, i) => 
        i === index ? {...task, completed: !task.completed} : task
      )
    );
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const pendingTasks = tasks.filter((task) => !task.completed).lenght;
  const completedTasks = tasks.filter((task) => task.completed).lenght;

  return (
    <div className="App">
      <h1>Lista de Tarefas</h1>
      <div className="task-input">
        <input
        type='text'
        placeholder='Adicione uma tarefa'
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Adicionar</button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleTask(index)}>{task.text}</span>
            <button onClick={() => removeTask(index)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;