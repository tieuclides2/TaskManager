import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['updateTask', taskId],
    mutationFn: async (newTask) => {
      //Chamo api aqui
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: newTask.title.trim(),
          time: newTask.time,
          description: newTask.description.trim(),
        }),
      })
      if (!response.ok) {
        throw new Error()
      }
      const updatedTask = await response.json()
      queryClient.setQueryData('tasks', (oldTasks) => {
        return oldTasks.map((oldTask) => {
          if (oldTask.id === taskId) {
            return updatedTask
          }
          return oldTask
        })
      })
    },
  })
}
