<template>
    <div>
        <div class="container">
            <div class="inner">
                <form action="/join" method="post" class="login"> 
                    <p>회원가입</p>
                    <div v-for="value, i in value" :key="i">
                        <input class="input" :type = type[i] :placeholder = value>
                    </div>
                    <div class="fileBox">
                        <label>프로필 사진을 넣어주새요</label>
                        <input class="file" type="file">
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
            value: ['이름을 입력하세요', '아이디를 입력하세요', '비밀번호를 입력하세요', '비밀번호를 한번 더 입력해주세요', 'Email', '닉네임', '전화번호', '자기소개'],
            type: ['text', 'text', 'password','password', 'email', 'text', 'tel', 'text']
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
                border: 1px solid rgb(181, 181, 181);
                // border: 0;
                padding-left: 10px;
            }
            .fileBox{
                font-size: 13px;
                text-align: end;
                .file{
                    border: 0;
                }
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