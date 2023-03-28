import { createRouter, createWebHistory } from 'vue-router'
import InstallTempalteView from '../views/install-template.vue'
import BooksView from '../views/books.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'books',
      component: BooksView,
    },
    {
      path: '/install-template',
      name: 'install-template',
      component: InstallTempalteView,
    },
  ],
})

export default router
