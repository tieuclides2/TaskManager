import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAddTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    //Chamo api aqui
    mutationKey: 'addTask',
    mutationFn: async (task) => {
      console.log(task)
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
      })

      if (!response.ok) {
        throw new Error()
      }

      const createdTask = response.json()
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
