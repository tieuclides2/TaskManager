import PropTypes from 'prop-types'
import Button from './Button'
import { AddIcon, TrashIcon } from '../assets/icons'
import AddTaskDialog from './AddTasksDialog'
import { useState } from 'react'

function Header({ title, subTitle }) {
  const [AddTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)
  return (
    <div className="flex w-full justify-between">
      <div>
        <span className="text-xs font-semibold text-brand-primary">
          {subTitle}
        </span>
        <h2 className="text-xl font-semibold">{title}</h2>
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
        />
      </div>
    </div>
  )
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Header
