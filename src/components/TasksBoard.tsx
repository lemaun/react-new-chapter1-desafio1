import { PlusCircle, ClipboardText } from 'phosphor-react'
import { ChangeEvent, FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './TasksBoard.module.css'
import { Task } from './Task';


interface taskProps {
  id: string;
  title: string;
  isComplete: boolean;
}

export function TasksBoard() {
  const [tasks, setTasks] = useState<taskProps[]>([]);
  const [newTitle, setNewTitle] = useState('');

  const isNewTaskEmpty = newTitle === '';
  const titleButton = isNewTaskEmpty ? 'Adicione uma nova tarefa' : '';

  const tasksCounter = tasks.length;
  const completedTasksCounter = tasks.filter(tasks=>{return tasks.isComplete}).length;


  function handleAddNewTask(event: FormEvent) {
    event.preventDefault()
    const tempNewTask:taskProps = {id: uuidv4(), title: newTitle, isComplete:false};
    setTasks([...tasks, tempNewTask])
    setNewTitle('')
  }
  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTitle(event.target.value)
  }
  function deleteTask(taskToDelete:string) {
    const remainingTasks = tasks.filter(task => {return task.id !== taskToDelete})
    setTasks(remainingTasks)
  }
  function changeStatusTask(taskToChange:string){
    const newStatusTasks = [...tasks]
    const findIndex = tasks.findIndex((task) => task.id === taskToChange)
    newStatusTasks[findIndex].isComplete = !newStatusTasks[findIndex].isComplete
    setTasks(newStatusTasks)
  }
  return (
    <div>
      <form onSubmit={handleAddNewTask} className={styles.taskForm}>
        <input
          type="text" 
          name="task" 
          placeholder="Adicione uma nova tarefa"
          onChange={handleNewTaskChange}
          value={newTitle}
          />

        <footer>
          <button
            type="submit"
            disabled={isNewTaskEmpty}
            title={titleButton}
            >Criar &nbsp;<PlusCircle size={18} /></button>
        </footer>
      </form>
      <div className={styles.header}>
        <div className={styles.tasksCounter}>Tarefas criadas <span>{tasksCounter}</span></div>
        <div className={styles.tasksFinished}>Concluídas <span>{ tasksCounter > 0 ? (<>{completedTasksCounter} de {tasksCounter}</>):(0)}</span></div>
      </div>
      <div className={styles.board}>
        {
          tasksCounter > 0 ? 
          (
            <ul className={styles.tasks}>
            {tasks.map(task => {
              return (
                <li key={task.id}>
                  <Task
                    id={task.id}
                    task={task.title}
                    onDeleteTask={deleteTask}
                    onChangeStatus={changeStatusTask}
                  />
                </li>
                )
              })}
            </ul>
          ):(
            <div className={styles.taskBoardEmpty}>
              <ClipboardText size={56} />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          )
        }
        
      </div>
    </div>
  )
}