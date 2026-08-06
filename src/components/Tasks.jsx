import Button from './Button'

//Icons
import AddIcon from '../assets/icons/add.svg?react'
import TrashIcon from '../assets/icons/trash.svg?react'
import SunIcon from '../assets/icons/sun.svg?react'
import CloudSunIcon from '../assets/icons/cloud-sun.svg?react'
import MoonIcon from '../assets/icons/moon.svg?react'
import { useState } from 'react'
import TASKS from '../constants/tasks'

//components
import TasksSeparator from './TasksSeparator'
import TaskItem from './TaskItem'

const Tasks = () => {
  const [tasks, setTasks] = useState(TASKS)

  const morningTasks = tasks.filter((tasks) => tasks.time === 'morning')
  const afternoonTasks = tasks.filter((tasks) => tasks.time === 'afternoon')
  const eveningTasks = tasks.filter((tasks) => tasks.time === 'evening')

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task
      }

      //essa tarefa eu preciso atualizar o status
      if (task.status === 'not_started') {
        return { ...task, status: 'in_progress' }
      }

      if (task.status === 'in_progress') {
        return { ...task, status: 'done' }
      }

      if (task.status === 'done') {
        return { ...task, status: 'not_started' }
      }

      return task
    })

    setTasks(newTasks)
  }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      {/* Títulos e Botões */}
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00ADB5]">
            Minhas tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas tarefas</h2>
        </div>
        {/* Botões */}
        <div className="flex items-center gap-3">
          <Button variant="ghost">
            Limpar Tarefa
            <TrashIcon />
          </Button>
          <Button>
            <AddIcon />
            Nova Tarefa
          </Button>
        </div>
      </div>

      {/* LISTA DE TAREFAS */}
      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />
          {/* Tarefas da manhã */}
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudSunIcon />} />
          {/* Tarefas da tarde */}
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {/* Tarefas da noite  */}
          {eveningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
