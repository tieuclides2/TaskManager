import Input from './Input'
import { createPortal } from 'react-dom'

import Button from './Button'

const AddTaskDialog = ({ isOpen, handleCloseDialog }) => {
  if (!isOpen) return null //faz com que o dialog não aparece caso children seja fale

  return createPortal(
    <div className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur">
      {/* dialog */}
      <div className="rounded-xl bg-white p-5 text-center shadow">
        <h2 className="text-xl font-semibold text-[#35383E]">Nova Tarefa</h2>
        <p className="mb-4 mt-1 text-[#9A9C9F]">Insira as informação aqui</p>

        <div className="flex w-[336px] flex-col space-y-4">
          <Input id="title" label="Título" placeholder="Título da tarefa" />
          <Input id="time" label="Horário" placeholder="Horário" />
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
  )
}

export default AddTaskDialog
