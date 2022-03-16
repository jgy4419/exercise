import { createRouter, createWebHistory } from 'vue-router';
import Main from '../components/main/Main.vue'
import Login from '../components/login/Login.vue'
import Join from '../components/login/Join.vue'
import SearchId from '../components/login/SearchId'
import SearchPw from '../components/login/SearchPw'


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
    },
    {
      path: "/login/SearchId",
      name: "SearchId",
      component: SearchId
    },
    {
      path: "/login/SearchPw",
      name: "SearchPw",
      component: SearchPw
    },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;