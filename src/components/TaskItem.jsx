import CheckIcon from '../assets/icons/check.svg?react'
import LoaderIcon from '../assets/icons/loader.svg?react'
import DetailsIcon from '../assets/icons/details.svg?react'

const TaskItem = ({ task, handleTaskCheckboxClick }) => {
  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'text-[#00ADB5] bg-[#00ADB5]'
    }

    if (task.status === 'in_progress') {
      return 'text-[#FFAA04] bg-[#FFAA04]'
    }

    if (task.status === 'not_started') {
      return 'text-[#35383E] bg-[#35383E] bg-opacity-10'
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
            onClick={() => handleTaskCheckboxClick(task.id)}
          />
          {task.status === 'done' && <CheckIcon />}
          {task.status === 'in_progress' && (
            <LoaderIcon className="animate-spin text-white" />
          )}
        </label>
        {task.title}
      </div>
      <a href="#" className="transition hover:opacity-75">
        <DetailsIcon />
      </a>
    </div>
  )
}

export default TaskItem
