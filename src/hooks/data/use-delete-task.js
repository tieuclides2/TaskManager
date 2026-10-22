import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/axios'
import { taskQueriesKeys } from '../../keys/queries'
import { taskMutationKeys } from '../../keys/mutations'

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: taskMutationKeys.delete(),
    mutationFn: async () => {
      const { data: deleteTask } = await api.delete(`/tasks/${taskId}`)

      return deleteTask
    },
    onSuccess: (deleteTask) => {
      // atualiza o cache da tarefa, segundo parametro da função é o que tenho no cache atualmente "currentTasks"
      queryClient.setQueryData(taskQueriesKeys.getAll(), (oldTasks) => {
        return oldTasks.filter((oldTask) => oldTask.id !== deleteTask.id)
      })
    },
  })
}
