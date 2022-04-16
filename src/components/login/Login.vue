<template>
    <div>
        <div class="container">
            <div class="inner">
                <form action="/login" method="post" class="login"> 
                    <p>로그인</p>
                    <div>
                        <input type="text" placeholder="아이디를 입력하세요!"/>
                    </div>
                    <div>
                        <input type="password" placeholder="비밀번호를 입력하세요!"/>
                    </div>
                    <router-link to="/community">
                        <input @click="cookie()" class="loginBtn" type="submit" value="로그인">
                    </router-link>
                </form>
                <ul class="loginList">
                        <li v-for="loginList, i in loginList" :key="i">
                            <router-link :to = route[i]>
                                {{loginList}}
                            </router-link>
                        </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            loginList: ['회원가입', '아이디 찾기', '비밀번호 찾기'],
            route: ['/login/Join', '/login/SearchId', '/login/SearchPw']
        }
    },
}
</script>

<style lang="scss" scoped>
.container{
    position: absolute;
    margin: auto;
    top: 20%;
    left: 0;
    right: 0;
    width: 40vw;
    height: 50vh;
    border-radius: 10px;
    .inner{
        color: #636363;
        p{
            font-size: 20px;
            font-weight: 700;
        }
        .login{
            text-align: center;
            padding-top: 20%;
            input{
                font-size: 15px;
                width: 300px;
                height: 50px;
                border-radius: 10px;
                margin-top: 10px;
                border: 2px solid rgb(181, 181, 181);
                padding-left: 10px;
            }
            .loginBtn{
                background-color: #93B5C6;
                color: #fcf3f3;
                font-weight: 900;
                box-sizing:content-box;
                border: 0px;
                transition: .3s;
                cursor: pointer;
            }
            .loginBtn:hover{
                // box-sizing: border-box;
                // border: 2px solid #FFE3E3;
                background-color: #6d84c9;
                color: #fff;
            }
        }
        .loginList{
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            cursor: pointer;
        }
    }
    @media screen and (max-width: 768px){
        
    }
}
</style>