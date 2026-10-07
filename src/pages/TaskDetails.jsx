import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Button from '../components/Button'
import Input from '../components/Input'
import TimeSelect from '../components/TimeSelect'
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from '../assets/icons'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const TaskDetailsPage = () => {
  const queryClient = useQueryClient()
  const { taskId } = useParams()
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()

  const { mutate: updateTask, isPending: updatedTaskIsLoading } = useMutation({
    mutationKey: ['updateTask', taskId],
    mutationFn: async (data) => {
      //Chamo api aqui
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: data.title.trim(),
          time: data.time,
          description: data.description.trim(),
        }),
      })
      if (!response.ok) {
        throw new Error()
      }
      const updatedTask = await response.json()
      queryClient.setQueryData('tasks', (oldTasks) => {
        return oldTasks.map((oldTask) => {
          if (oldTask.id === taskId) {
            return updatedTask
          }
          return oldTask
        })
      })
    },
  })

  const { mutate: deleteTask, isPending: deleteTaskIsLoading } = useMutation({
    mutationKey: ['deleteTask', taskId],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error()
      }

      const deletedTask = await response.json()
      queryClient.setQueryData('tasks', (oldTasks) => {
        return oldTasks.filter((oldTask) => oldTask.id !== deletedTask.id)
      })
    },
  })

  const { data: task } = useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      })
      const data = await response.json()
      reset(data)
    },
  })

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleSaveClick = async (data) => {
    updateTask(data, {
      onSuccess: () => toast.success('Tarefa atualizada com sucesso!'),
      onError: () => toast.error('Error ao atualiza a tarefa.'),
    })
  }

  const handleDeleteTask = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success('Tarefa deletada com sucesso!')
        navigate(-1)
      },
      onError: () => {
        toast.error('Error ao deletar tarefa')
      },
    })
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-6">
        {/* Barra do top */}
        <div className="flex w-full justify-between">
          {/* Parte da esquerda */}
          <div>
            <button
              onClick={handleBackClick}
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <Link className="cursor-pointer text-brand-dark-gray" to="/">
                Minhas tarefas
              </Link>
              <ChevronRightIcon className="text-brand-dark-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>

            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>
          {/* Parte da direita */}
          <Button
            className="h-fit self-end"
            color="danger"
            onClick={handleDeleteTask}
          >
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        <form onSubmit={handleSubmit(handleSaveClick)}>
          {/* dados da tarefa */}
          <div className="space-y-6 rounded-xl bg-brand-white p-6">
            <div>
              <Input
                id="title"
                label="Título"
                {...register('title', {
                  required: 'O Título é obrigatório.',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'Título não pode ser vazio.'
                    }
                    return true
                  },
                })}
                errorMessage={errors?.title?.message}
              />
            </div>

            <div>
              <TimeSelect
                {...register('time', { required: 'O horário é obrigatório.' })}
                errorMessage={errors?.time?.message}
              />
            </div>

            <div>
              <Input
                id="description"
                label="Descrição"
                {...register('description', {
                  required: 'A descrição é obrigatória.',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'Descrição não pode ser vazia.'
                    }
                    return true
                  },
                })}
                errorMessage={errors?.description?.message}
              />
            </div>
          </div>

          {/* Botoes de cancelar e salvar  */}
          <div className="flex justify-end gap-3">
            <Button
              size="large"
              color="primary"
              type="submit"
              disabled={updatedTaskIsLoading || deleteTaskIsLoading}
            >
              {(updatedTaskIsLoading || deleteTaskIsLoading) && (
                <LoaderIcon className="animate-spin" />
              )}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskDetailsPage
