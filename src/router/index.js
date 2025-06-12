import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import AttractionDetail from '../views/AttractionDetail.vue';
import Profile from '../views/Profile.vue';
import Favorites from '../views/Profile.vue'; // 使用相同的组件，只是激活不同的菜单
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Search from '../views/Search.vue';

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
    path: '/favorites',
    name: 'Favorites',
    component: Favorites
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
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    props: (route) => ({ keyword: route.query.keyword })
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
