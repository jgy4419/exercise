<template>
    <div>
        <div class="container">
            <div class="inner">
                <!-- <form action="/api/login" method="post" class="login">  -->
                    <p>로그인</p>
                    <div>
                        <input type="text" v-model="logins.mail" name="mail" placeholder="아이디를 입력하세요!"/>
                    </div>
                    <div>
                        <input type="password" v-model="logins.password" name="password" placeholder="비밀번호를 입력하세요!"/>
                    </div>
                    <router-link to="/community">
                        <input @click="login()" class="loginBtn" type="submit" value="로그인">
                    </router-link>
                <!-- </form> -->
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
// import axios from 'axios';
export default {
    data(){
        return{
            loginList: ['회원가입', '아이디 찾기', '비밀번호 찾기'],
            route: ['/login/Join', '/login/SearchId', '/login/SearchPw'],
            logins: {
                mail: '',
                password: ''
            }
        }
    },
    methods: {
        login(){
            // /api/login으로 값을 아이디, 비밀번호를 보냄 -> 백엔드는 DB에서 아이디, 비밀번호가 일치한게 있으면 가져와서 보내줌.(토큰) => 둥일한게 없으면 boolean 값이 false인 것을 넣어줌.
            // axios.post('/api/login', {mail: this.logins.mail, password: this.logins.password})
            // .then(res => {
            //     let date = new Date(Date.now() + 86400e3);
            //     date = date.toUTCString();
            //     document.cookie = `user=${res.data.token}; expires=` + date;
            //     location.href = '/community';
            //     console.log(res);
            //     if(!document.cookie){
            //         alert('아이디나 비밀번호가 잘 못 되었습니다.');
            //         location.href = '/login';
            //     }
            // })
            // .catch(err => {console.log(err)})

            if(document.cookie){
                location.href = '/community';
            }else if(!document.cookie){
                alert('아이디나 비밀번호가 잘 못 되었습니다.');
                // location.href = '/login';
            }
        }
    }
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
            margin: auto;
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
                width: 280px;
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
            margin: auto;
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            cursor: pointer;
        }
    }
    @media screen and (max-width: 750px){
        .container{
            width: 10vw;
            .inner{
                p{
                    margin: auto;
                    font-size: 18px;
                }
                .login{
                    input{
                        font-size: 12px;
                        width: 300px;
                        height: 50px;
                    }
                    // .loginBtn{
                    //     width: 100%;
                    // }
                }
            }
        }
        .loginList{
            margin-right: -40px;
            font-size: 12px;
        }
    }
    @media screen and (max-width: 500px){
        .inner{
            p{
                font-size: 15px;
            }
            .login{
                input{
                    font-size: 12px;
                    width: 200px;
                    height: 40px;
                }
                .loginBtn{
                    width: 185px;
                }
            }
            .loginList{
                font-size: 8px;
            }
        }
    }
}
</style>