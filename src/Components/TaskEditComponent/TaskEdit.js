import React, { useState} from 'react';
import axios from 'axios';
import cancel from '../../img/cancel.png';
import save from '../../img/save.png';
import './TaskEditComponent.css';

const TaskEdit = ({onCancelEdit, index, task, onSetEditNum, setTasks, allTasks}) => {
  const [inputCorrections, setInputCorrections] = useState(task.text);

  const changeValueCorrect = (e) => {
    setInputCorrections(e.target.value);
  }

  const saveCorrection = async (index) => {
    await axios.patch('http://localhost:8000/updateTask', {
      _id: allTasks[index]._id,
      text: inputCorrections
    }).then(res => {
      setTasks(res.data.data);
    });
    if (inputCorrections) {
      allTasks[index].text = inputCorrections;
      setTasks([...allTasks]);
      onSetEditNum(null);
    }
  }

  return (
    <div className='task-edit-block'>
      <input type='checkbox' />
      <input 
        type='text' 
        onChange={changeValueCorrect} 
        value={inputCorrections}
        className='edit-task-input'
      />
      <img 
        src={cancel}
        alt='' 
        className='img-cancel' 
        onClick={() => onCancelEdit(index)} 
      />
      <img 
        src={save}
        alt=''  
        className='img-save' 
        onClick={() => saveCorrection(index)} 
      />
    </div>
  )
}

export default TaskEdit;