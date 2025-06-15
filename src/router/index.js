import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import AttractionDetail from '../views/AttractionDetail.vue';
import Profile from '../views/Profile.vue';

import Login from '../views/Login.vue';
import Register from '../views/Register.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/attraction/:id',
    name: 'AttractionDetail',
    component: AttractionDetail,
    props: true
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {

  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
     {
       path: '/not-found',
       name: 'NotFound',
       component: () => import('../views/NotFound.vue')
     },
     ...routes
   ]
});

export default router;
