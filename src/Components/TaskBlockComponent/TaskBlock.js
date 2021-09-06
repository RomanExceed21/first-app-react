import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import del from '../../img/del.png';
import edit from '../../img/edit.png';
import './TaskBlockComponent.css';

const TaskBlock = ({allTasks, handleEditTask, setTasks}) => {
  const removeTask =  (_id) => {
    axios.delete(`http://localhost:8000/deleteTask?_id=${_id}`).then(res => {
      setTasks(res.data.data);      
    });
  }

  const doneTask = (index) => {
    const { _id, isCheck } = allTasks[index];
    axios.patch('http://localhost:8000/updateTask', {
      _id, isCheck: !isCheck
    }).then(res => {
      setTasks(res.data.data);      
    });
  }

  return (
    allTasks.map((task, index) => {
      const { isCheck, text, _id } = task;
      return (
        <div key = {`task-${index}`} className='task-block'>
          <Checkbox
            color='primary'
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite/>}
            checked={task.isCheck}
            onChange={() => doneTask(index)}
          />    

          <p className={`task-text ${isCheck ? 'done-text' : ''}`}>{text}</p>  
          
          <img  
            src={del} 
            alt=''
            className='img-del'
            onClick={() => removeTask(_id)} 
          />           
          {!isCheck && 
            <Link to={`/edit/:${_id}`}>
              <img src={edit} 
                alt='' 
                className='img-edit' 
                onClick={() => handleEditTask(index)}
              />
            </Link>}
        </div>  
      )
    })      
  )
}

export default TaskBlock;
