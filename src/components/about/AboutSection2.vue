<template>
    <div class="contain">
        <div class="inner">
            <p>팀원 소개</p>
            <div class="line"/>
            <div class="users">
                <div class="devUser" v-for="name, i in name" :key="i">
                    <img class="profileImg" :src="profile[i]"/>
                    <div class="textIntroduction">
                        <p>Name : {{name}}</p>
                        <p>Dev : {{dev[i]}}</p>
                        <p>Email : {{email[i]}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    data(){
        return{
            profile: ['https://avatars.githubusercontent.com/u/76980526?v=4', 'https://avatars.githubusercontent.com/u/76980526?v=4', 'https://avatars.githubusercontent.com/u/76980526?v=4'],
            name: ['정규영', '박세승', '문정환'],
            dev: ['FrontEnd', 'Backend', 'Backend'],
            email: ['jgy_98@naver.com', 'abc@naver.com', 'def@naver.com'],
        }
    }
}
</script>

<style lang="scss" scoped>
.contain{
    width: 100vw;
    .inner{
        position: relative;
        z-index: 10;
        padding-top: 5%;
        width: 700px;
        margin: auto;
        p{
            font-size: 30px;
            font-weight: 700;
        }
        .line{
            width: 120px;
            height: 3px;
            background-color: #333;
        }
        .users{
            width: 100%;
            display: flex;
            justify-content: space-between;
            .devUser{
                text-align: center;
                margin-top: 30px;
                width: 100%;
                height: 300px;
                .profileImg{
                    text-align: center;
                    width: 150px;
                    border-radius: 10px;
                    // border: 3px solid rgb(227, 227, 227);
                }
                p{
                    font-size: 20px;
                    font-weight: 700;
                    margin-top: 20px;
                }
            }
        }
    }
    .footer{
        margin-top: 50px;
    }
}
</style>