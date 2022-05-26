<template>
    <div class="noticeBox">
        <div class="inner">
            <swiper-slide>1</swiper-slide>
            <swiper-slide>2</swiper-slide>
            <swiper-slide>3</swiper-slide>

            <div class="swiper-pagination" slot="pagination"></div>

            <div class="swiper-button-prev swiper-btn-prev" slot="button-prev"></div>
            <div class="swiper-button-next swiper-btn-next" slot="button-next"></div>
            <!-- <div class="items" v-for="data, i in noticeData.title.length" :key="i">
                <div class="left">
                    <p class="title">{{noticeData.title[i]}}</p>
                </div>
                <div class="right">
                    <img :src="noticeData.titleImg[i]" alt="">
                </div> -->
            </div>
        </div>
    <!-- </div>     -->
</template>

<script>
// https://studyhardgogo.tistory.com/180 참고
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper);
import {Swiper,SwiperSlide} from 'vue-awesome-swiper'

export default {
    components:{
        Swiper,
        SwiperSlide
    },
    data(){
        return{
            noticeData: {
                leng: 0,
                title: ['test1', 'test2', 'test3'],
                titleImg: ['../../image/mainImg/main.jpeg', '../../image/mainImg/main2.jpeg', '../../image/mainImg/main3.jpeg']
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.noticeBox {
    // width: 100vw * 3;
    height: 500px;
    background-color: #333;
    .inner{
        margin: auto;
        width: 80vw;
        height: 100%;
        display: flex;
        .items{
            z-index: 100;
            position: relative;
            width: 100%;   
            height: 100%;
            display: flex;
            .left{
                position: absolute;
                left: 0;
                .title{
                    font-size: 50px;
                    font-weight: 700;
                }
            }
            .right{
                position: absolute;
                right: 0;
                img{
                    width: 300px;
                    height: 300px;
                }
            }
        }
    }
}
</style>