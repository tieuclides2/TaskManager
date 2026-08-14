import Input from './Input'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import './AddTaskDialog.css'

import Button from './Button'
import { useRef } from 'react'
import InputLabel from './InputLabel'

const AddTaskDialog = ({ isOpen, handleCloseDialog }) => {
  const nodeRef = useRef()

  // if (!isOpen) return null //faz com que o dialog não aparece caso children seja fale

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
                />

                {/* Select de momentos do dia */}
                <div className="flex flex-col gap-1 text-left">
                  <InputLabel htmlFor="time">Horário</InputLabel>

                  <select
                    id="time"
                    className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]"
                  >
                    <option value="morning">Manhã</option>
                    <option value="afternoon">Tarde</option>
                    <option value="evening">Noite</option>
                  </select>
                </div>

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
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
                <Button size="large" className="w-full">
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
