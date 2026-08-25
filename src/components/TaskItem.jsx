import CheckIcon from '../assets/icons/check.svg?react'
import LoaderIcon from '../assets/icons/loader.svg?react'
import DetailsIcon from '../assets/icons/details.svg?react'
import TrashIcon from '../assets/icons/trash.svg?react'

//Components
import Button from '../components/Button'

const TaskItem = ({ task, handleCheckboxClick, handleDeleteClick }) => {
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
        <Button color="ghost" onClick={() => handleDeleteClick(task.id)}>
          <TrashIcon className="text-[##9A9C9F]" />
        </Button>

        <a href="#" className="transition hover:opacity-75">
          <DetailsIcon />
        </a>
      </div>
    </div>
  )
}

export default TaskItem
