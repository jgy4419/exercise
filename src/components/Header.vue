<template>
  <header class="header">
    <nav class="web">
      <router-link to="/">
        <p class="logo">오 운 완</p>
      </router-link>
      <div>
        <router-link v-for="url, i in url" :key="i" :to="url">
            <button>{{login[i]}}</button>
        </router-link>
      </div>
    </nav>
    <div class="menuListIcon"
    @click="hamburger()">
        <div class="line" v-for="a in 3" :key="a"></div>
    </div>
    <nav class="mobileMenu">
        <ul v-for="list in login" :key="list">
          <li>{{list}}</li>
        </ul>
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
  },
  methods: {
    hamburger(){
      let line = document.querySelectorAll('.line');
      let mobileMenu = document.querySelector('.mobileMenu');
      let body = document.querySelector('.body');
      for(var i = 0; i < line.length; i++){
          line[i].classList.toggle('event');
      }
      // 햄버거 누르면 옆에 메뉴 생성해주기. + 배경 어둡게 해주기.
      mobileMenu.classList.toggle('event');
      body.classList.toggle('event');
    },
  }
}
</script>

<style lang="scss" scoped>
@font-face {
    font-family: 'RixYeoljeongdo_Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2102-01@1.0/RixYeoljeongdo_Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
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
      font-family: 'RixYeoljeongdo_Regular';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2102-01@1.0/RixYeoljeongdo_Regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
      font-size: 25px;
      color: #333;
    }
    .logo:hover{
      color: #333;
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
  // 햄버거 아이콘
  .menuListIcon{
    position: absolute;
    top: 0;
    right: 10%;
    cursor: pointer;
    z-index: 100;
    padding: 30px;
    width: 75px;
    height: 75px;
    display: none;
    .line{
      width: 30px;
      cursor: pointer;
      position: absolute;
      border-bottom: 5px solid #333;
    }
    .line:nth-child(2){
        margin-top: 10px;
    }
    .line:nth-child(3){
        animation-name: hamburgetBottom;
        margin-top: 20px;
    }
    .line.event:nth-child(1){
        animation-name: hamburgerTop;
        animation-duration: 1s;
        animation-fill-mode: forwards;
    }
    .line.event:nth-child(2){
        opacity: 0;
    }
    .line.event:nth-child(3){
        animation-name: hamburgerBottom;
        animation-fill-mode: forwards;
        animation-duration: 1s;
    }
    @keyframes hamburgerTop{
        0%{
            
            transform: rotate(0deg);
        }
        50%{
            transform: translateY(10px);
        }
        100%{
            transform: translateY(10px)rotateZ(50deg);
        }
    }
    @keyframes hamburgerBottom{
        0%{
            transform: rotate(0deg);
        }
        50%{
            transform: translateY(-10px);
        }
        100%{
            transform: translateY(-10px) rotateZ(-50deg);
        }
    }
  }
  .mobileMenu{
    position: absolute;
    display: none;
    width: 30vw;
    height: 100vh;
    ul{
      display: flex;
      flex-direction: row;
    }
  }
   @media screen and (max-width: 768px){
    nav{
      display: block;
      button{
          display: none;
          width: 75px;
          height: 40px;
          font-size: 15px;
      }
    }
    .menuListIcon{
      display: block;
    }
    .mobileMenu{
      display: block;
    }
  }
}
</style>
