import Button from './Button'

//Icons
import {
  AddIcon,
  TrashIcon,
  SunIcon,
  CloudSunIcon,
  MoonIcon,
} from '../assets/icons/index'

//hooks
import { useEffect, useState } from 'react'

//components
import TasksSeparator from './TasksSeparator'
import TaskItem from './TaskItem'
import { toast } from 'sonner'
import AddTaskDialog from './AddTasksDialog'

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [AddTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)

  useEffect(() => {
    // preciso pegar os dados da APi
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
      })
      const tasks = await response.json()
      //após pegar os dados da API, atualizar o state 'Tasks'
      setTasks(tasks)
    }

    fetchTasks()
  }, [])

  const morningTasks = tasks.filter((tasks) => tasks.time === 'morning')
  const afternoonTasks = tasks.filter((tasks) => tasks.time === 'afternoon')
  const eveningTasks = tasks.filter((tasks) => tasks.time === 'evening')

  //Deletar tarefa
  const OnDeleteTaskSucess = async (taskId) => {
    const newTask = tasks.filter((task) => task.id !== taskId)
    setTasks(newTask)
    toast.success('Tarefa deletada com sucesso!')
  }

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

    setTasks(newTasks)
  }

  // Funçao para adicionar uma tarefa
  const onTaskSubmitSucess = (task) => {
    setTasks([...tasks, task])
    toast.success('Tarefa adicionada com sucesso!')
  }

  const onSubmitErro = () => {
    return toast.error('Error ao inserir tarefa, tente novamente mais tarde.')
  }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      {/* Títulos e Botões */}
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-primary">
            Minhas tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas tarefas</h2>
        </div>
        {/* Botões */}
        <div className="flex items-center gap-3">
          <Button color="ghost">
            Limpar Tarefa
            <TrashIcon />
          </Button>
          <Button onClick={() => setAddTaskDialogIsOpen(true)}>
            <AddIcon />
            Nova Tarefa
          </Button>

          {/* modal de nova tarefa */}
          <AddTaskDialog
            isOpen={AddTaskDialogIsOpen}
            handleCloseDialog={() => setAddTaskDialogIsOpen(false)}
            onSubmitSucess={onTaskSubmitSucess}
            onSubmitError={onSubmitErro}
          />
        </div>
      </div>

      {/* LISTA DE TAREFAS */}
      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />
          {morningTasks.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da manhã.
            </p>
          )}
          {/* Tarefas da manhã */}
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              onDeleteSucess={OnDeleteTaskSucess}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudSunIcon />} />
          {afternoonTasks.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da tarde.
            </p>
          )}
          {/* Tarefas da tarde */}
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              onDeleteSucess={OnDeleteTaskSucess}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {eveningTasks.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da manhã.
            </p>
          )}
          {/* Tarefas da noite  */}
          {eveningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              onDeleteSucess={OnDeleteTaskSucess}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
