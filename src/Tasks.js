import React from 'react';
import del from "./img/del.png"
import edit from "./img/edit.png"
import cancel from "./img/cancel.png"
import save from "./img/save.png"

const Tasks = ({allTasks, text, isCheck, index, removeTask, doneTask, editTask, editNum, cancelEdit, changeValueCorrect, saveCorrection}) => {
  if(editNum !== index) {
    return (
      <div className="task-block">
        <input onChange={() => doneTask(index)} type="checkbox"/>
        <p className={!isCheck ? 'task-text' : 'task-text done-text'}>{text}</p>
        <input type="image" src={del} style={{width: '22px'}} onClick={() => removeTask(index)} />
        <input type="image" src={edit} style={{width: '20px'}} onClick={() => editTask(index)}/>
      </div>
    )
  } else {
    return (
      <div className="task-edit-block">
        <input type="checkbox"></input>
        <input onChange={changeValueCorrect} type="text" id="correct-task" />
        <input type="image" src={cancel} style={{width: '22px'}} 
          onClick={() => cancelEdit(index)} 
        />
        <input type="image" src={save} style={{width: '20px'}} 
          onClick={() => saveCorrection(index)}
        />
    </div>
    )
  }
}

export default Tasks
