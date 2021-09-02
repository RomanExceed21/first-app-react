import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskBlock from './Components/TaskBlockComponent/TaskBlock';
import TaskEdit from './Components/TaskEditComponent/TaskEdit';
import './App.css';

const App = () => {
  const [allTasks, setTasks] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [editNum, setEditNum] = useState(null);
  allTasks.sort((a, b) => a.isCheck - b.isCheck)


  useEffect(() => {
    axios.get('http://localhost:8000/allTasks').then(res => {
      setTasks(res.data.data);
    });
  }, [setTasks])

  const changeValue = (e) => {
    setUserInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(userInput);
    setUserInput('');
  }

  const addTask = (userInput) => {
    if (userInput) {
      axios.post('http://localhost:8000/createTask', {
        text: userInput, 
        isCheck: false
      }).then(res => {
        setTasks(res.data.data);
      });
    }    
  }

  const handleEditTask = (index) => {
    setEditNum(index);
  }

  const handleCancelEdit = () => {
    setEditNum(null);
  }

  return (
    <div className='App'>
      <div className='header'>
        <header>
          <h1>Список задач</h1>
        </header>
        <div className='input-block'>
          <input className='input-task' onChange={changeValue} type='text' value={userInput}/>
          <button className='add-button' onClick={handleSubmit}>Save Task</button>      
      </div>
      </div>
      <div className='all-input-tasks'>
        {
          allTasks.map((task, index) => {
            const params = { task, index, allTasks, setTasks };
            const key = `task-${index}`;
            if (editNum !== index) {
              params.onEditTask = handleEditTask;
            } else {
              params.onCancelEdit = handleCancelEdit;
              params.onSetEditNum = setEditNum;
            }
            return (editNum !== index ? <TaskBlock key={key} {...params} /> : <TaskEdit key={key} {...params} />)
          })
        }
      </div>
    </div>
  );
}

export default App;