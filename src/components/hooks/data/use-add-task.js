import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../../lib/axios'

export const useAddTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    //Chamo api aqui
    mutationKey: 'addTask',
    mutationFn: async (task) => {
      const { data: createdTask } = await api.post('/tasks', task)

      return createdTask
    },
    //Atualizo nesse onSucess o cache
    onSuccess: (createdTask) => {
      queryClient.setQueryData('tasks', (oldTasks) => {
        return [...oldTasks, createdTask]
      })
    },
  })
}
