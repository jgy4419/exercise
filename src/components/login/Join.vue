<template>
    <div>
        <div class="container">
            <div class="inner">
                <form action="/join" method="post" class="login"> 
                    <p>회원가입</p>
                    <div v-for="value, i in value" :key="i">
                        <input :type = type[i] :placeholder = value>
                    </div>
                    <input class="loginBtn" type="submit" value="회원가입">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            value: ['이름을 입력하세요', '아이디를 입력하세요', '비밀번호를 입력하세요', '비밀번호를 한번 더 입력해주세요', 'Email', '닉네임', '전화번호', '자기소개', ''],
            type: ['text', 'text', 'password','password', 'email', 'text', 'tel', 'text', 'file']
        }
    }
}
</script>

<style lang="scss" scoped>
.container{
    position: absolute;
    margin: auto;
    top: 10%;
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
    }
}
</style>