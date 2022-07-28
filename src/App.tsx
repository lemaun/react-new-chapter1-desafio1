import { Header } from './components/Header'

import styles from './App.module.css'
import './global.css'
import { TasksBoard } from './components/TasksBoard'


export default function App() {

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <TasksBoard />
      </div>
    </div>
  )
}

