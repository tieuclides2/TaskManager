import Input from './Input'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { v4 } from 'uuid'

import './AddTaskDialog.css'

import Button from './Button'
import { useEffect, useRef, useState } from 'react'
import TimeSelect from './TimeSelect'

const AddTaskDialog = ({ isOpen, handleCloseDialog, handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('morning')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState([])

  const nodeRef = useRef()

  // if (!isOpen) return null //faz com que o dialog não aparece caso children seja fale

  // Limpar inputs
  useEffect(() => {
    if (!isOpen) {
      setTitle('')
      setTime('morning')
      setDescription('')
    }
  }, [isOpen])

  const handleSaveClick = () => {
    const newErros = []

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

    //se houver error não executa handleSubmit

    handleSubmit({
      id: v4(),
      title,
      time,
      description,
      status: 'not_started',
    })
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
              <h2 className="text-xl font-semibold text-[#35383E]">
                Nova Tarefa
              </h2>
              <p className="mb-4 mt-1 text-[#9A9C9F]">
                Insira as informação aqui
              </p>

              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  id="title"
                  label="Título"
                  placeholder="Título da tarefa"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  errorMessage={titleError?.message}
                />

                <TimeSelect
                  onChange={(event) => setTime(event.target.value)}
                  value={time}
                  errorMessage={timeError?.message}
                />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  errorMessage={descriptionError?.message}
                />
              </div>
              {/* Botoes do modal*/}
              <div className="mt-1 flex gap-3">
                <Button
                  size="large"
                  className="w-full text-center"
                  variant="secondary"
                  onClick={() => handleCloseDialog()}
                >
                  Cancelar
                </Button>
                <Button
                  size="large"
                  className="w-full"
                  onClick={handleSaveClick}
                >
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

export default AddTaskDialog
