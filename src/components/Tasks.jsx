//Icons
import { SunIcon, CloudSunIcon, MoonIcon } from '../assets/icons/index'

//components
import TasksSeparator from './TasksSeparator'
import TaskItem from './TaskItem'
import { toast } from 'sonner'

import { useQueryClient } from '@tanstack/react-query'
import { useGetTasks } from '../hooks/data/use-get-tasks'
import Header from './Header'
import { taskQueriesKeys } from '../keys/queries'

const Tasks = () => {
  const queryClient = useQueryClient()
  //custom hook
  const { data: tasks } = useGetTasks()

  const morningTasks = tasks?.filter((tasks) => tasks.time === 'morning')
  const afternoonTasks = tasks?.filter((tasks) => tasks.time === 'afternoon')
  const eveningTasks = tasks?.filter((tasks) => tasks.time === 'evening')

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task
      }

      //essa tarefa eu preciso atualizar o status
      if (task.status === 'not_started') {
        toast.success('Tarefa iniciada com sucesso')
        return { ...task, status: 'in_progress' }
      }

      if (task.status === 'in_progress') {
        toast.success('Tarefa concluída com sucesso')
        return { ...task, status: 'done' }
      }

      if (task.status === 'done') {
        toast.success('Tarefa reiniciada com sucesso')
        return { ...task, status: 'not_started' }
      }

      return task
    })
    queryClient.setQueryData(taskQueriesKeys.getAll(), newTasks)
  }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <Header subTitle="Minhas Tarefas" title="Minhas Tarefas" />

      {/* LISTA DE TAREFAS */}
      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />
          {morningTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da manhã.
            </p>
          )}
          {/* Tarefas da manhã */}
          {morningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudSunIcon />} />
          {afternoonTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da tarde.
            </p>
          )}
          {/* Tarefas da tarde */}
          {afternoonTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {eveningTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da manhã.
            </p>
          )}
          {/* Tarefas da noite  */}
          {eveningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
