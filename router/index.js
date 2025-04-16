import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Temp from '../views/Temp.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/temp',
    name: 'Temp',
    component: Temp
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
