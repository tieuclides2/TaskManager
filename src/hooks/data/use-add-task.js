import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/axios'
import { taskQueriesKeys } from '../../keys/queries'
import { taskMutationKeys } from '../../keys/mutations'

export const useAddTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    //Chamo api aqui
    mutationKey: taskMutationKeys.add(),
    mutationFn: async (task) => {
      const { data: createdTask } = await api.post('/tasks', task)

      return createdTask
    },
    //Atualizo nesse onSucess o cache
    onSuccess: (createdTask) => {
      queryClient.setQueryData(taskQueriesKeys.getAll(), (oldTasks) => {
        return [...oldTasks, createdTask]
      })
    },
  })
}
