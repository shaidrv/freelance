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
  },
  mutations: {
    createTask(state, task) {
      return state.tasks.push(task)
    },
  },
  actions: {
    createTask({ commit }, task) {
      commit('createTask', task)
    },
  },
  modules: {},
})
