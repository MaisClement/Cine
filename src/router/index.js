import { createRouter, createWebHashHistory } from 'vue-router'
import Accueil from '../views/Accueil.vue'
import Details from '../views/Details.vue'
import People from '../views/People.vue';

const routes = [
  {
    path: '/',
    name: 'accueil',
    component: Accueil
  },
  {
    path: '/details',
    name: 'details',
    component: Details
  },
  {
    path: '/people',
    name: 'people',
    component: People
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
