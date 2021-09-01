import axios from 'axios';
import React from 'react';
import del from '../../img/del.png';
import edit from '../../img/edit.png';
import './TaskBlockComponent.css';

const TaskBlock = ({allTasks, onEditTask, index, task, setTasks}) => {
  const { isCheck, text } = task;

  const removeTask = async (_id) => {
    await axios.delete(`http://localhost:8000/deleteTask?_id=${_id}`).then(res => {
      setTasks(res.data.data);      
    })
  }

  const doneTask = async (index) => {
    await axios.patch('http://localhost:8000/updateTask', {
      _id: allTasks[index]._id,
      isCheck: !allTasks[index].isCheck
    }).then(res => {
      setTasks(res.data.data);      
    })
  }

  return (
    <div className='task-block'>
      <input 
        type='checkbox' 
        onChange={() => doneTask(index)}
      />
      <p className={`task-text' ${isCheck ? 'done-text' : ''}`}>{text}</p>
      <img  
        src={del} 
        alt=''
        className='img-del'
        onClick={() => removeTask(task._id)} 
      />
      <img 
        src={edit} 
        alt=''
        className='img-edit'
        onClick={() => onEditTask(index)}/>
    </div>
  )
}

export default TaskBlock;