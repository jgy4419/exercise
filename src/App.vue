<template>
  <Header/>
  <!-- <router-view/> -->
</template>

<script>
// import Chart from 'chart.js';
import Header from './components/Header.vue'
export default {
  components: {
    Header
  },
  data(){
    return{
      day: new Date().getDate(),
    }
  },
  watch: {
    // "일"이 지나면 로그아웃 시켜준.
    day: function(){
        console.log('logout!');
        localStorage.removeItem('userInformation');
        // 쿠키를 전 시간으로 돌려서 로그아웃 시켜줌.
        document.cookie = 'user=; expires=Thu, 18 Dec 2013 12:00:00 GMT';
    }
  }
}
</script>

<style lang="scss">
.importantText{
  font-weight: 700;
  color: #93B5C6;
}
</style>
