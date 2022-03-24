<template>
    <div class="container">
        <div class="inner">
            <p class="title3">시작해보세요!</p>
            <div class="icons">
                <div class="icon" v-for="icons, i in icon.length" :key="i">
                    <p class="iconText">{{text[i]}}</p>
                    <i :class = icon[i]></i>
                </div>
            </div>
            <Footer class="footer"/>
        </div>
    </div>
</template>

<script>
import Footer from '../Footer.vue'
export default {
    components: {
        Footer
    },
    data(){
        return{
            icon: ['fa fa-dumbbell', 'fa fa-users', 'fa fa-pager'],
            text: ['운동', '소통', '기록']
        }
    },
    mounted(){
        this.loading();
    },
    methods: {
        loading(){
            let title3 = document.querySelector('.title3');
            let icon = document.querySelectorAll('.icon');
            document.addEventListener('scroll', function(){
                let currentScrollValue = document.documentElement.scrollTop;
                if(currentScrollValue > 3000){
                    title3.classList.add('event');
                    for(let i = 0; i < icon.length; i++){
                        setTimeout(() => {
                            icon[i].classList.add('event');
                        }, 500)
                    }
                }else{
                    title3.classList.remove('event');
                    for(let i = 0; i < icon.length; i++){
                        setTimeout(() => {
                            icon[i].classList.remove('event');
                        }, 500)
                    }
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.container{
    background-color: #f2f4f6;
    width: 100vw;
    height: 100vh;
    .inner{
        width: 80%;
        height: 40%;
        margin: auto;
        .title3{
            padding-top: 10%;
            font-size: 50px;
            font-weight: 700;
            text-align: center;
            transition: 1s;
            opacity: 0;
            transform: translateY(100px);
        }
        .title3.event{
            opacity: 1;
            transform: translateY(0px);
        }
        .icons{
            width: 60%;
            margin: auto;
            display: flex;
            justify-content: space-between;
            .icon{
                color: #333;
                opacity: 0;
                transition: 1s;
                transform: translateY(120px);
                .iconText{
                    text-align: center;
                    font-size: 30px;
                    font-weight: 700;
                }
                i{
                    font-size: 50px;
                    width: 150px;
                    height: 100px;
                    text-align: center;
                    padding-top: 50px;
                    border: 5px solid rgb(160, 160, 160);
                    border-radius: 30px;
                }
            }
            .icon.event{
                opacity: 1;
                transform: translateY(0px);
            }
        }
        .footer{
            padding-top: 15%;
        }
    }
}
</style>