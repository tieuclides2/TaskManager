import Input from './Input'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

import './AddTaskDialog.css'

import Button from './Button'
import { useRef } from 'react'
import TimeSelect from './TimeSelect'

import { LoaderIcon } from '../assets/icons/index'
import { v4 } from 'uuid'
import { useForm } from 'react-hook-form'

const AddTaskDialog = ({
  isOpen,
  handleCloseDialog,
  onSubmitSucess,
  onSubmitError,
}) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      time: 'morning',
      description: '',
    },
  })

  const nodeRef = useRef()

  const handleSaveClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      time: data.time,
      description: data.description.trim(),
      status: 'not_started',
    }
    //Chamo api aqui
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    })
    if (!response.ok) {
      return onSubmitError()
    }
    onSubmitSucess(task)
    handleCloseDialog()
    reset({
      title: '',
      time: 'morning',
      description: '',
    })
  }

  const handleCancelClick = () => {
    reset({
      title: '',
      time: 'morning',
      description: '',
    })
    handleCloseDialog()
  }

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

              <form onSubmit={handleSubmit(handleSaveClick)}>
                <div className="flex w-[336px] flex-col space-y-4">
                  <Input
                    id="title"
                    label="Título"
                    placeholder="Título da tarefa"
                    errorMessage={errors?.title?.message}
                    {...register('title', {
                      required: 'O Título é obrigatório.',
                      validate: (value) => {
                        if (!value.trim()) {
                          return 'Título não pode ser vazio.'
                        }
                        return true
                      },
                    })}
                  />

                  <TimeSelect
                    errorMessage={errors?.time?.message}
                    {...register('time', {
                      required: 'O horário é obrigatório.',
                    })}
                  />

                  <Input
                    id="description"
                    label="Descrição"
                    placeholder="Descreva a tarefa"
                    errorMessage={errors?.description?.message}
                    {...register('description', {
                      required: 'A descrição é obrigatória.',
                      validate: (value) => {
                        if (!value.trim()) {
                          return 'Descrição não pode ser vazia.'
                        }
                        return true
                      },
                    })}
                  />
                </div>
                {/* Botoes do modal*/}
                <div className="mt-1 flex gap-3">
                  <Button
                    size="large"
                    className="w-full text-center"
                    color="secondary"
                    onClick={handleCancelClick}
                    type="button"
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && <LoaderIcon className="animate-spin" />}
                    Salvar
                  </Button>
                </div>
              </form>
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
