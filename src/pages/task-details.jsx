import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()

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

  return (
    <div className="flex">
      <Sidebar />
      <div>
        {/* Barra do top */}
        <div className="flex w-full justify-between">
          {/* parte da esquerda */}
          <div className="flex items-center gap-1">
            <span>Minhas tarefas</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
