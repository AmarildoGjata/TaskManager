import React, { useState, useEffect } from 'react';
       import './App.css';

       function App() {
         const [tasks, setTasks] = useState([]);
         const [title, setTitle] = useState('');
         const [description, setDescription] = useState('');

         useEffect(() => {
           fetch('http://localhost:8000/api/tasks/')
             .then(response => response.json())
             .then(data => setTasks(data));
         }, []);

         const handleSubmit = (e) => {
           e.preventDefault();
           fetch('http://localhost:8000/api/tasks/', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ title, description, completed: false }),
           })
             .then(response => response.json())
             .then(data => {
               setTasks([...tasks, data]);
               setTitle('');
               setDescription('');
             });
         };

         const handleDelete = (id) => {
           fetch(`http://localhost:8000/api/tasks/${id}/`, { method: 'DELETE' })
             .then(() => setTasks(tasks.filter(task => task.id !== id)));
         };

         return (
           <div className="App">
             <h1>Task Manager</h1>
             < form onSubmit={handleSubmit}>
               <input
                 type="text"
                 placeholder="Task Title"
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 required
               />
               <textarea
                 placeholder="Task Description"
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
               />
               <button type="submit">Add Task</button>
             </form>
             <ul>
               {tasks.map(task => (
                 <li key={task.id}>
                   <h3>{task.title}</h3>
                   <p>{task.description}</p>
                   <button onClick={() => handleDelete(task.id)}>Delete</button>
                 </li>
               ))}
             </ul>
           </div>
         );
       }

       export default App;