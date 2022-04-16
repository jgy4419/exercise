<template>
    <div class="contain">
        <div class="inner">
            <div class="devUser" v-for="name, i in name" :key="i">
                <img class="profileImg" :src="profile[i]"/>
                <div class="textIntroduction">
                    <p>Name : {{name}}</p>
                    <p>Dev : {{dev[i]}}</p>
                    <p>Email : {{email[i]}}</p>
                </div>
            </div>
        </div>
        <Footer class="footer"/>
    </div>
</template>

<script>
import Footer from '../Footer.vue';
export default {
    data(){
        return{
            profile: ['https://avatars.githubusercontent.com/u/76980526?v=4', 'https://avatars.githubusercontent.com/u/76980526?v=4', 'https://avatars.githubusercontent.com/u/76980526?v=4'],
            name: ['정규영', '박세승', '문정환'],
            dev: ['FrontEnd', 'Backend', 'Backend'],
            email: ['jgy_98@naver.com', 'abc@naver.com', 'def@naver.com'],
        }
    },
    components: {
        Footer,
    }
}
</script>

<style lang="scss" scoped>
.contain{
    width: 100vw;
    .inner{
        padding-top: 5%;
        width: 700px;
        margin: auto;
        .devUser{
            text-align: center;
            margin-top: 30px;
            width: 100%;
            height: 300px;
            .profileImg{
                width: 150px;
                border-radius: 50%;
                border: 3px solid rgb(227, 227, 227);
            }
            p{
                font-size: 20px;
                font-weight: 700;
                margin-top: 20px;
            }
        }
    }
    .footer{
        margin-top: 50px;
    }
}
</style>