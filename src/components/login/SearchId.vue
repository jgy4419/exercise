<template>
    <div>
        <div class="container">
            <div class="inner">
                <form action="/searchid" method="post" class="login"> 
                    <p>아이디 찾기</p>
                    <div class="inputBox" v-for="value, i in value" :key="i">
                        <!-- <label for="input">{{label[i]}}</label> -->
                        <input id="input" :type = type[i] :placeholder = value>
                    </div>
                    <input class="loginBtn" type="submit" value="찾기">
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
            label: ['이름', '전화번호'],
            value: ['이름을 입력하세요', '전화번호'],
            type: ['text', 'tel'],
            loginList: ['로그인', '회원가입', '비밀번호 찾기'],
            route: ['/login', '/login/Join', '/login/SearchPw']
        }
    }
}
</script>

<style lang="scss" scoped>
.container{
    position: absolute;
    margin: auto;
    top: 30%;
    left: 0;
    right: 0;
    width: 40vw;
    // border: 2px solid #333;
    border-radius: 10px;
    padding-bottom: 3%;
    .inner{
        color: #636363;
        p{
            font-size: 20px;
            font-weight: 700;
        }
        .login{
            text-align: center;
            input{
                font-size: 15px;
                width: 300px;
                height: 50px;
                border-radius: 10px;
                border: 2px solid rgb(181, 181, 181);
                padding-left: 10px;
                margin-top: 10px;
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
}
</style>