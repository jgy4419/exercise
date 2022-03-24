<template>
  <header class="header">
    <nav>
      <router-link to="/">
        <img src="https://user-images.githubusercontent.com/76980526/158522490-66bc3bfe-4651-4848-b142-9f932d1f05f7.png" alt="로고" class="logo">
      </router-link>
      <div>
        <router-link v-for="url, i in url" :key="i" :to="url">
            <button>{{login[i]}}</button>
        </router-link>
      </div>
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
.header{
  position: relative;
  z-index: 10;
  width: 100vw;
  nav{
    padding-top: 10px;
    display: flex;
    left: 0;
    right: 0;
    margin: auto;
    width: 80vw;
    color: rgb(165, 165, 165);
    justify-content: space-between;
    .logo{
      width: 75px;
    }
    button{
      width: 100px;
      height: 50px;
      background-color: transparent;
      color: rgb(89, 89, 89);
      border-radius: 30px;
      border: 1px solid #333;
      margin-left: 10px;
      transition: .5s;
      font-size: 18px;
      cursor: pointer;
    }
    button:hover{
      border: 1px solid #fff;
      background-color: #C9CCD5;
      color: #fff;
    }
    .logo{
      cursor: pointer;
    }
  }
}
</style>
