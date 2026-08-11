import { createPortal } from 'react-dom'

const AddTaskDialog = ({ isOpen }) => {
  if (!isOpen) return null //faz com que o dialog não aparece caso children seja fale

  return createPortal(
    <div className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur">
      {/* dialog */}
      <div className="rounded-xl bg-white p-5 text-center shadow">
        <h2 className="text-xl font-semibold text-[#35383E]">Nova Tarefa</h2>
        <p className="mt-1 text-[#9A9C9F]">Insira as informação aqui</p>
      </div>
    </div>,
    document.body
  )
}

export default AddTaskDialog
