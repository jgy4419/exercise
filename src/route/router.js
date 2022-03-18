import { createRouter, createWebHistory } from 'vue-router';
import Main from '../components/main/Main.vue'
import Login from '../components/login/Login.vue'
import Join from '../components/login/Join.vue'
import SearchId from '../components/login/SearchId'
import SearchPw from '../components/login/SearchPw'
import Community from '../components/community/Community'


const routes = [
    // 메인페이지
    {
      path: "/",
      name: "Main",
      component: Main,
    },
    // 로그인 관련 페이지
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
    // 커뮤니티 페이지
    {
      path: "/community",
      name: "Community",
      component: Community
    }
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;