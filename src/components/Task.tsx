import { Trash } from 'phosphor-react'
import styles from './Task.module.css'

interface taskProps {
  id:string;
  task:string;
  onDeleteTask: (id:string) => void;
  onChangeStatus: (id:string) => void;
}

export function Task({ id,task,onDeleteTask,onChangeStatus }:taskProps){
  function handleDeleteTask() {
    onDeleteTask(id)
  }
  function handleStatusChange() {
    onChangeStatus(id)
  }
  return (
    <div className={styles.task}>
      <input id={id} type="checkbox" onChange={handleStatusChange} />
      <label htmlFor={id}>
        {task}
        <button onClick={handleDeleteTask} title="Excluir tarefa">
          <Trash size={20} />
        </button>
      </label>
    </div>
  )
}