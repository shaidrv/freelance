import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: [],
  },
  getters: {
    tasks(state) {
      return state.tasks
    },
    activeTasksCount(state) {
      return state.tasks.filter((task) => task.status === 'active').length
    },
    taskById(_, getters) {
      return (id) => getters.tasks.find((task) => task.id === id)
    },
  },
  mutations: {
    createTask(state, task) {
      return state.tasks.push(task)
    },
    setTasks(state, result) {
      return (state.tasks = result)
    },
    changeStatus(state, payload) {
      const task = state.tasks.find((task) => task.id === payload.id)
      task.status = payload.status
    },
  },
  actions: {
    async loadTasks({ commit }) {
      const response = await fetch(
        'https://tasks-ae30f-default-rtdb.firebaseio.com/tasks.json'
      )
      const data = await response.json()
      const result = Object.keys(data).map((key) => {
        return {
          id: key,
          ...data[key],
        }
      })
      commit('setTasks', result)
    },
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
    async changeStatus({ commit, getters }, payload) {
      commit('changeStatus', payload)
      const task = getters.taskById(payload.id)
      const response = await fetch(
        `https://tasks-ae30f-default-rtdb.firebaseio.com/tasks/${payload.id}.json`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task),
        }
      )
    },
  },
})
