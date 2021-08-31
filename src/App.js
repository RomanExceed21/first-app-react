import Tasks from "./Tasks";
import './App.css'
import {useState} from 'react'

const App = () => {
  const [allTasks, setTasks] = useState([])
  const [userInput, setUserInput] = useState('')
  const [editNum, setEditNum] = useState(null)
  const [inputCorrections, setInputCorrections] = useState('')
  

  const changeValue = (e) => {
    setUserInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addTask(userInput);
    setUserInput('')
  }

  const addTask = (userInput) => {
    if (userInput) {
      const task = {
        text: userInput,
        isCheck: false
      }
      setTasks([...allTasks, task])
    }
  }

  const removeTask = (index) => {
    setTasks([...allTasks.slice(0, index), ...allTasks.slice(index + 1)])
 
  }

  const doneTask = (index) => {
    allTasks[index].isCheck = !allTasks[index].isCheck;  
    setTasks([...allTasks]);
  }

  const editTask = (index) => {
    setEditNum(index)
  }

  const cancelEdit = () => {
    setEditNum(null)
  }

  const changeValueCorrect = (e) => {
    setInputCorrections(e.target.value);
  }

  const saveCorrection = (index) => {
    if (inputCorrections) {
      allTasks[index].text = inputCorrections;
      setTasks([...allTasks]);
      setEditNum(null)
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Список задач</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <input onChange={changeValue} type="text" value={userInput}/>
        <button>Save</button>      
      </form>
      <div className="all-input-tasks">
        {
          allTasks.map((value, index) => 
            <Tasks 
              key={index} 
              text={value.text} 
              isCheck={value.isCheck}
              addTask={addTask}
              index={index}
              removeTask={removeTask}
              doneTask={doneTask}
              editTask={editTask}
              editNum={editNum}
              cancelEdit={cancelEdit}
              saveCorrection={saveCorrection}
              changeValueCorrect={changeValueCorrect}
            />)
        }
      </div>
    </div>
  );
}

export default App;