<template>
    <div class="container">
        <div class="inner">
            <p class="title">
                <span v-for="text in textLine" :key="text" class="textLine">
                    {{text}}
                    <br/>
                </span>
            </p>
            <router-link to="/login">
                <button class="btn">시작하기</button>
            </router-link>
        </div>
        <div class="halfBackground"/>
    </div>    
</template>

<script>
export default {
    data(){
        return{
            textLine: ['운동을', '과학적으로', '효율적으로'],
        }
    },
    mounted(){
        this.loding();
    },
    methods: {
        loding(){
            let text = document.querySelectorAll('.textLine');
            for(let i = 0; i < text.length; i++){
                setTimeout(() => {
                    text[i].classList.add('event');
                    console.log(text[i]);
                }, 300);
            }
        }
    }   
}
</script>

<style lang="scss" scoped>
.container{
    position: relative;
    .inner{
        position: relative;
        z-index: 10;
        width: 1100px;
        margin: auto;
        .title{
            color: rgb(29, 15, 15);
            font-size: 70px;
            font-weight: 700;
            z-index: 10;
            line-height: 150%;
            .textLine{
                opacity: 0;
                transform: translateY(0px);
            }
            .textLine:nth-child(1).event{
                transition: 1s;
                transform: translateY(100px);
                opacity: 1;
            }
            .textLine:nth-child(2).event{
                transition: 2s;
                transform: translateY(100px);
                opacity: 1;
            }
            .textLine:nth-child(3).event{
                transition: 3s;
                transform: translateY(100px);
                opacity: 1;
            }
        }
        .btn{
            background-color: transparent;
            font-size: 18px;
            font-weight: 700;
            width: 150px;
            height: 60px;
            border: 2px solid #333;
            border-radius: 30px;
            transition: .5s;
            cursor: pointer;
        }
        .btn:hover{
            background-color: #93B5C6;
            color: #fff;
            border: 2px solid #fff;
        }
    }
    .halfBackground{
        position: absolute;
        z-index: 1;
        bottom: 5%;
        width: 100vw;
        height: 90vh;
        box-shadow:  inset 10px 150px 300px #fff;
        background-image: url('https://health.chosun.com/site/data/img_dir/2018/03/07/2018030700812_2.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: left;
    }
}

</style>