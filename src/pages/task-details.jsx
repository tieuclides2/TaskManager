import { useEffect, useRef, useState } from 'react'
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

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const [saveIsLoading, setSaveIsLoading] = useState(false)
  const [errors, setErrors] = useState([])

  const titleRef = useRef()
  const descriptionRef = useRef()
  const timeRef = useRef()

  const navigate = useNavigate()
  const handleBackClick = () => {
    navigate(-1)
  }

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      })
      const data = await response.json()
      setTask(data)
    }
    fetchTask()
  }, [taskId])
  console.log(task)

  const handleSaveClick = async () => {
    setSaveIsLoading(true)
    const newErros = []

    const title = titleRef.current.value
    const description = descriptionRef.current.value
    const time = timeRef.current.value

    if (!title.trim()) {
      newErros.push({
        inputName: 'title',
        message: 'O título é obrigatório.',
      })
    }
    if (!time.trim()) {
      newErros.push({
        inputName: 'time',
        message: 'O horário é obrigatório.',
      })
    }
    if (!description.trim()) {
      newErros.push({
        inputName: 'description',
        message: 'A descrição é obrigatória.',
      })
    }
    setErrors(newErros)
    console.log({ newErros })
    if (newErros.length > 0) {
      return setSaveIsLoading(false)
    }

    //Chamo api aqui
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title,
        description,
        time,
      }),
    })
    if (!response.ok) {
      return setSaveIsLoading(false)
    }
    const newTask = await response.json()
    setTask(newTask)
    setSaveIsLoading(false)
  }

  const handleDeleteTask = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      toast.error('Error ao deletar tarefa')
    }

    navigate(-1)
  }

  const titleError = errors.find((error) => error.inputName === 'title')
  const timeError = errors.find((error) => error.inputName === 'time')
  const descriptionError = errors.find(
    (error) => error.inputName === 'description'
  )

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

        {/* dados da tarefa */}
        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <div>
            <Input
              id="title"
              label="Título"
              defaultValue={task?.title}
              errorMessage={titleError?.message}
              ref={titleRef}
            />
          </div>

          <div>
            <TimeSelect
              defaultValue={task?.time}
              errorMessage={timeError?.message}
              ref={timeRef}
            />
          </div>

          <div>
            <Input
              id="description"
              label="Descrição"
              defaultValue={task?.description}
              errorMessage={descriptionError?.message}
              ref={descriptionRef}
            />
          </div>
        </div>

        {/* Botoes de cancelar e salvar  */}
        <div className="flex justify-end gap-3">
          <Button
            size="large"
            color="primary"
            onClick={handleSaveClick}
            disabled={saveIsLoading}
          >
            {saveIsLoading && <LoaderIcon className="animate-spin" />}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
