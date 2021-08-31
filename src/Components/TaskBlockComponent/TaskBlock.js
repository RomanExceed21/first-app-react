import React from 'react';
import del from '../../img/del.png';
import edit from '../../img/edit.png';
import './TaskBlockComponent.css'

const TaskBlock = ({allTasks, onEditTask, index, task, setTasks}) => {
  const { isCheck, text } = task;

  const removeTask = (index) => {
    setTasks([...allTasks.slice(0, index), ...allTasks.slice(index + 1)]);
  }

  const doneTask = (index) => {
    allTasks[index].isCheck = !allTasks[index].isCheck;  
    setTasks([...allTasks]);
  }

  return (
    <div className='task-block'>
      <input 
        type='checkbox'
        onChange={() => doneTask(index)}
      />
      <p className={!isCheck ? 'task-text' : 'task-text done-text'}>{text}</p>
      <img  
        src={del} 
        alt=''
        className='img-del'
        onClick={() => removeTask(index)} 
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