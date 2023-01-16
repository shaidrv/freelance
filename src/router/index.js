import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '../views/Tasks'
import New from '../views/New'
import Task from '../views/New'

const routes = [
  {
    path: '/',
    name: 'tasks',
    component: Tasks,
  },
  {
    path: '/new',
    name: 'new',
    component: New,
  },
  {
    path: '/task/:id',
    name: 'task',
    component: Task,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
})

export default router
