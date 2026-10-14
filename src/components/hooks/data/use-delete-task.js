import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: 'deleteTask',
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
      })
      const deleteTask = response.json()
      return deleteTask
    },
    onSuccess: (deleteTask) => {
      // atualiza o cache da tarefa, segundo parametro da função é o que tenho no cache atualmente "currentTasks"
      queryClient.setQueryData('tasks', (oldTasks) => {
        return oldTasks.filter((oldTask) => oldTask.id !== deleteTask.id)
      })
    },
  })
}
