<template>
  <!-- <router-view> -->
    <header class="header">
      <nav class="web">
        <router-link to="/">
          <p class="logo">오 운 완</p>
        </router-link>
        <div class="webMenu">
          <router-link v-for="url, i in url" :key="i" :to="url">
              <button class="menuBtn">
                {{login[i]}}
              </button>
          </router-link>
          <button :style="{backgroundImage:`url('${myBtnImg}')`}" @click="myModal()" class="myBtn"/>
        </div>
      </nav>
      <div class="myInformationBox">  
        <ul>
          <li class="myBoxli" v-for="menu, i in menuList.text" :key="i">
            <router-link :to="menuList.url[i]">
              {{menuList.text[i]}}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="menuListIcon"
      @click="hamburger()">
          <div class="line" v-for="a in 3" :key="a"></div>
      </div>
      <nav class="mobileMenu">
          <ul v-for="list, i in mobile.login.length" :key="i">
            <router-link :to="mobile.url[i]">
              <li class="mobileMenuList">
                  {{mobile.login[i]}}
              </li>
            </router-link>
          </ul>
      </nav>
    </header>
  <router-view/>
</template>

<script>




export default {
  data(){
    return{
      url: ['/about', '/community'],
      login: ['오운완?', 'community'],
      mobile: {
        url: ['/about', '/community'],
        login: ['오운완?', 'community']
      },
      menuList: {
          text: ['MyPage', 'settings', 'logout'],
          url: ['/mypage', '/settings', '/'],
      },
      myBtnImg: '',
      modalState: 0,
    }
  },
  watch: {
    // url 변경이 감지되면 myInformationBox 없애주기.
    '$route' (){
      let myInformationBox = document.querySelector('.myInformationBox');
      myInformationBox.classList.remove('event');
      
    }
  },
  mounted(){
    console.log(this.$route.path)

    let userInformation = JSON.parse(localStorage.getItem("userInformation"));
    // 만약 사이트에 쿠키가 저장되어 있으면 logint -> logout이 있는 메뉴로 변경.
    let myBoxli = document.querySelectorAll('.myBoxli');
    let myBtn = document.querySelector('.myBtn');

    if(localStorage.userInformation){
      this.login = [];
      this.url = [];
      myBtn.style.display = 'inline';
      this.myBtnImg = `${userInformation.profile_img_path}`;

      // 로그인 유무에 따라 header 메뉴 구성 변경.
      this.login.push('오운완?', 'community');
      this.url.push('/about', '/community');

      this.mobile.url.push('/mypage', '/settings', '/');
      this.mobile.login.push('MyPage', 'settings', 'logout')
      // 로그인 이후 menu[4]번째 즉, logout 버튼을 누르면 웹에서 쿠키 제

      // let mobileMenuList = document.querySelectorAll('.mobileMenuList');

      // let logoutBtn = [myBoxli[2], mobileMenuList[3]];
      // for(let i = 0; i < logoutBtn.length; i++){
      //   logoutBtn[i].addEventListener('click', function(){
      //     console.log('logout!');
      //     localStorage.removeItem('userInformation');
      //     // 쿠키를 전 시간으로 돌려서 로그아웃 시켜줌.
      //     document.cookie = 'user=; expires=Thu, 18 Dec 2013 12:00:00 GMT'
      //     location.replace('/');
      //   })
      // }
      myBoxli[2].addEventListener('click', function(){
        console.log('logout!');
        localStorage.removeItem('userInformation');
        // 쿠키를 전 시간으로 돌려서 로그아웃 시켜줌.
        document.cookie = 'user=; expires=Thu, 18 Dec 2013 12:00:00 GMT'
        location.replace('/');
      })
    }else if(!localStorage.userInformation){
      this.login = []; this.url = [];
      this.mobile.url = []; this.mobile.login = [];
      myBtn.style.display = 'none';
      document.querySelector('.webMenu').style.bottom = '-7px';
      // 로그인 유무에 따라 header 메뉴 구성 변경.
      this.login.push('오운완?', 'community', 'login', 'join');
      this.url.push('/about', '/community', '/login', '/login/join');

      this.mobile.url.push('/about', '/community', '/login', '/join');
      this.mobile.login.push('오운완', 'community', 'login', 'join');
    }
  },
  methods: {
    myModal(){
      let myInformationBox = document.querySelector('.myInformationBox');
      myInformationBox.classList.toggle('event');
    },
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
  background-color: #fff;
  z-index: 100;
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
    .webMenu{
      position: relative;
      .menuBtn{
        position: relative;
        bottom: 10px;
        width: 100px;
        font-size: 14px;
        font-weight: 700;
      }
      .myBtn{
        position: relative;
        background-size: cover;
        left: 10px;
        // top: 10px;
        width: 35px;
        height: 35px;
        background-color: rgb(233, 233, 233);
      }
    }
    button{
      width: 80px;
      height: 40px;
      background-color: transparent;
      color: rgb(89, 89, 89);
      border-radius: 30px;
      // border: 1px solid #333;
      border: 0;
      margin-left: 10px;
      transition: .2s;
      font-size: 16px;
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
  .myInformationBox.event{
    display: block;
  }
  .myInformationBox{
    display: none;
    position: absolute;
    margin-top: 10px;
    right: 8%;
    width: 90px;
    height: 100px;
    font-size: 12px;
    background-color: rgb(243, 243, 243);
    ul{
      position: absolute;
      top: 8px;
      right: 18px;
      li{
        font-size: 14px;
        color: #333;
        cursor: pointer;
        font-weight: 500;
        line-height: 27px;
      }
    }
  }
  // 햄버거 아이콘
  .menuListIcon{
    position: fixed;
    opacity: 0;
    transform: translateX(200px);
    top: 0;
    right: 10%;
    cursor: pointer;
    z-index: 100;
    padding: 30px;
    width: 75px;
    height: 75px;
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
    position: fixed;
    margin-top: -55px;
    display: none;
    transform: translateX(700px);
    transition: .5s;
    ul{
      margin-top: 5%;
      .mobileMenuList{
        font-size: 25px;
        font-weight: 700;
        // width: 200px;
        color: #fff;
        text-align: right;
        padding: 4% 20%;
      }
    }
  }
  .mobileMenu.event{
    z-index: 10;
    opacity: 1;
    width: 100%;
    height: 100vh;
    background: rgba(51, 51, 51, 0.7);
    transform: translateX(0px);
    transition: .5s;
  }
  @media screen and (max-width: 1000px){
    .webMenu{
      .menuBtn{
        font-size: 12px;
        width: 80px;
        height: 30px;
      }
    }
  }
   @media screen and (max-width: 768px){
     background-color: transparent;
    nav{
      .webMenu{
          display: none;
          width: 75px;
          height: 40px;
          font-size: 15px;
      }
    }
    .myBtn{
      display: none;
    }
    .menuListIcon{
      display: block;
      transform: translateX(0px);
      opacity: 1;
    }
    .mobileMenu{
      display: block;
    }
  }
}
</style>
