import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/axios'
import { taskQueriesKeys } from '../../keys/queries'
import { taskMutationKeys } from '../../keys/mutations'

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: taskMutationKeys.update(taskId),
    mutationFn: async (newTask) => {
      //Chamo api aqui
      const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, {
        title: newTask.title.trim(),
        time: newTask.time,
        description: newTask.description.trim(),
      })

      queryClient.setQueryData(taskQueriesKeys.getAll(), (oldTasks) => {
        return oldTasks.map((oldTask) => {
          if (oldTask.id === taskId) {
            return updatedTask
          }
          return oldTask
        })
      })
      queryClient.setQueryData(taskQueriesKeys.getOne(taskId), updatedTask)
    },
  })
}
