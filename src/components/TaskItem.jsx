import PropTypes from 'prop-types'

import {
  CheckIcon,
  LoaderIcon,
  DetailsIcon,
  TrashIcon,
} from '../assets/icons/index'

//Components
import Button from '../components/Button'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const TaskItem = ({ task, handleCheckboxClick }) => {
  const queryClient = useQueryClient()
  //chamar api para deletar a tarefa
  const { mutate, isPending } = useMutation({
    mutationKey: 'deleteTask',
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: 'DELETE',
      })
      return response.json()
    },
  })
  //Deletar tarefa
  const handleDeleteClick = async () => {
    mutate(undefined, {
      onSuccess: () => {
        // atualiza o cache da tarefa, segundo parametro da função é o que tenho no cache atualmente "currentTasks"
        queryClient.setQueryData('tasks', (oldTasks) => {
          return oldTasks.filter((oldTask) => oldTask.id !== task.id)
        })
        toast.success('Tarefa deletada com sucesso!')
      },
      onError: () => {
        toast.error('Erro ao deletar tarefa!')
      },
    })
  }

  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'text-brand-primary bg-brand-primary'
    }

    if (task.status === 'in_progress') {
      return 'text-brand-process bg-brand-process'
    }

    if (task.status === 'not_started') {
      return 'text-brand-dark-blue bg-brand-dark-blue bg-opacity-10'
    }
  }

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 text-sm ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === 'done'}
            className="absolute h-full w-full cursor-pointer opacity-0"
            //Depois troca para onchange aqui
            onChange={() => handleCheckboxClick(task.id)}
          />
          {task.status === 'done' && <CheckIcon />}
          {task.status === 'in_progress' && (
            <LoaderIcon className="animate-spin text-white" />
          )}
        </label>
        {task.title}
      </div>

      <div className="flex gap-2">
        <Button color="ghost" onClick={handleDeleteClick} disabled={isPending}>
          {isPending ? (
            <LoaderIcon className="animate-spin text-brand-text-gray" />
          ) : (
            <TrashIcon className="text-[##9A9C9F]" />
          )}
        </Button>

        <Link to={`/task/${task.id}`}>
          <DetailsIcon />
        </Link>
      </div>
    </div>
  )
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(['morning', 'afternoon', 'evening']).isRequired,
    status: PropTypes.oneOf(['not_started', 'in_progress', 'done']).isRequired,
  }).isRequired,
  handleCheckboxClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
}

export default TaskItem
