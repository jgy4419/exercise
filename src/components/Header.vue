<template>
  <header>
    <nav>
      <img src="" alt="로고">
      <router-link v-for="url, i in url" :key="i" :to="url">
        <button>{{login[i]}}</button>
      </router-link>
    </nav>

  </header>
  <router-view/>
</template>

<script>

export default {
  data(){
    return{
      url: ['/login', '/login/join'],
      login: ['login', 'join']
    }
  }
}
</script>

<style lang="scss" scoped>
  nav{
    position: absolute;
    display: flex;
    z-index: 10;
    margin-left: 10%;
    right: 20%;
    width: 500px;
    color: rgb(165, 165, 165);
    justify-content: space-between;
    button{
      width: 100px;
      height: 50px;
      background-color: transparent;
      color: rgb(89, 89, 89);
      border-radius: 10px;
      border: 3px solid #fff;
      font-size: 18px;
    }
  }
</style>
