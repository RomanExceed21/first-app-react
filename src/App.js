import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskBlock from './Components/TaskBlockComponent/TaskBlock';
import TaskEdit from './Components/TaskEditComponent/TaskEdit';
import './App.css';

const App = () => {
  const [allTasks, setTasks] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [editNum, setEditNum] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/allTasks').then(res => {
      setTasks(res.data.data);
    });
  })

  const changeValue = (e) => {
    setUserInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(userInput);
    setUserInput('');
  }

  const addTask = async (userInput) => {
    await axios.post('http://localhost:8000/createTask', {
      text: userInput, 
      isCheck: false
    });
    if (userInput) {
      const task = {
        text: userInput,
        isCheck: false
      }
      setTasks([...allTasks, task]);
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
      <header>
        <h1>Список задач</h1>
      </header>
      <div className='input-block'>
        <input onChange={changeValue} type='text' value={userInput}/>
        <button onClick={handleSubmit}>Save</button>      
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