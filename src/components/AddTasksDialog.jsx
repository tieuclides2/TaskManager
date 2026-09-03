import Input from './Input'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

import './AddTaskDialog.css'

import Button from './Button'
import { useRef, useState } from 'react'
import TimeSelect from './TimeSelect'
import LoaderIcon from '../assets/icons/loader.svg?react'
import { v4 } from 'uuid'

const AddTaskDialog = ({
  isOpen,
  handleCloseDialog,
  onSubmitSucess,
  onSubmitError,
}) => {
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const nodeRef = useRef()

  const titleRef = useRef()
  const descriptionRef = useRef()
  const timeRef = useRef()

  // if (!isOpen) return null //faz com que o dialog não aparece caso children seja fale

  const handleSaveClick = async () => {
    setIsLoading(true)
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
      return
    }

    const task = { id: v4(), title, time, description, status: 'not_started' }
    //Chamo api aqui
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    })
    if (!response.ok) {
      setIsLoading(false)

      return onSubmitError()
    }
    onSubmitSucess(task)
    setIsLoading(false)
    handleCloseDialog()
  }

  const titleError = errors.find((error) => error.inputName === 'title')
  const timeError = errors.find((error) => error.inputName === 'time')
  const descriptionError = errors.find(
    (error) => error.inputName === 'description'
  )

  return (
    // transicao para o modal
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            {/* dialog */}
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova Tarefa
              </h2>
              <p className="mb-4 mt-1 text-brand-text-gray">
                Insira as informação aqui
              </p>

              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  id="title"
                  label="Título"
                  placeholder="Título da tarefa"
                  errorMessage={titleError?.message}
                  ref={titleRef}
                  disabled={isLoading}
                />

                <TimeSelect
                  errorMessage={timeError?.message}
                  ref={timeRef}
                  disabled={isLoading}
                />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  errorMessage={descriptionError?.message}
                  ref={descriptionRef}
                  disabled={isLoading}
                />
              </div>
              {/* Botoes do modal*/}
              <div className="mt-1 flex gap-3">
                <Button
                  size="large"
                  className="w-full text-center"
                  color="secondary"
                  onClick={() => handleCloseDialog()}
                >
                  Cancelar
                </Button>
                <Button
                  size="large"
                  className="w-full"
                  onClick={handleSaveClick}
                  disabled={isLoading}
                >
                  {isLoading && <LoaderIcon className="animate-spin" />}
                  Salvar
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default AddTaskDialog
