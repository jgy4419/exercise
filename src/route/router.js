import { createRouter, createWebHistory } from 'vue-router';
import Main from '../components/main/Main.vue'
import Login from '../components/login/Login.vue'
import Join from '../components/login/Join.vue'


const routes = [
    {
      path: "/",
      name: "Main",
      component: Main,
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/login/join",
      name: "Join",
      component: Join
    }
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;