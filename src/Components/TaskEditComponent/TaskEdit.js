import React, { useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import cancel from '../../img/cancel.png';
import save from '../../img/save.png';
import './TaskEditComponent.css';

const TaskEdit = ({onCancelEdit, index, task, onSetEditNum, setTasks, allTasks, editRoutVal}) => {
  const [inputCorrections, setInputCorrections] = useState(editRoutVal);

  const changeValueCorrect = (e) => {
    setInputCorrections(e.target.value);
  }

  const saveCorrection = (index) => {
    if (inputCorrections) {
      axios.patch('http://localhost:8000/updateTask', {
        _id: allTasks[index]._id,
        text: inputCorrections
      }).then(res => {
        setTasks(res.data.data);
        onSetEditNum(null); 
      });
    }   
  }

  return (
    <div className='task-edit-block'>
      <Checkbox
        color='primary'
        disabled
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite/>}
      />
      <input 
        type='text' 
        onChange={changeValueCorrect} 
        value={inputCorrections}
        className='edit-task-input'
      />
      <Link to='/home'>
        <img 
        src={cancel} 
        alt='' className='img-cancel' 
        onClick={() => onCancelEdit(index)} 
      /></Link>
      <Link to='/home'>
      <img 
        src={save}
        alt=''  
        className='img-save' 
        onClick={() => saveCorrection(index)} 
      /></Link>
    </div>
  )
}

export default TaskEdit;