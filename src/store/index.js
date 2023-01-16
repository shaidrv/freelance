import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: [
      {
        title: 'test',
        id: 1,
      },
    ],
  },
  getters: {
    tasks(state) {
      return state.tasks
    },
    activeTasksCount(state) {
      return state.tasks.filter((task) => task.status === 'active').length
    },
    taskById() {},
  },
  mutations: {
    createTask(state, task) {
      return state.tasks.push(task)
    },
  },
  actions: {
    async createTask({ commit }, task) {
      if (new Date(task.date) >= new Date()) {
        task.status = 'active'
      } else {
        task.status = 'cancelled'
      }
      const response = await fetch(
        'https://tasks-ae30f-default-rtdb.firebaseio.com/tasks.json',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task),
        }
      )
      const firebaseData = await response.json()
      const id = firebaseData.name
      task.id = id

      commit('createTask', task)
    },
  },
  modules: {},
})
