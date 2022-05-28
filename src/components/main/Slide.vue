<template>
    <div class="contain">
        <div class="notice">
            <p class="noticeTitle">오운완 공지</p>
            <div class="line"/>
        </div>
        <vueper-slides
        :slide-ratio="1 / 6"
            class="slideBox"
            ref="myVueperSlides"
            autoplay
            :pause-on-hover="pauseOnHover"
            @autoplay-pause="internalAutoPlaying = false"
            @autoplay-resume="internalAutoPlaying = true">
            <vueper-slide v-for="(slide, i) in slides" :key="i" 
                class="slideInner"
                :title="slide.title" 
                :content="slide.content" 
                :style="`
                    background-color: ${backgroundImage[0]};
                `"
            />
        </vueper-slides>
    </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides';
import 'vueperslides/dist/vueperslides.css'
export default {
    components: { VueperSlides, VueperSlide },
    data: () => ({
        backgroundImage: ['rgb(250, 255, 255)'],
        pauseOnHover: true,
        autoPlaying: true,
        internalAutoPlaying: true,
        slides: [
            {
                title: `<p class="slideTitle"
                style='font-size: 30px; font-weight: 700;'>놓칠 수 없는 첫 회원 이벤트</p>`,
                content: `<p class="slideContent"
                style='font-size: 20px; font-weight: 500;'>첫 회원가입 시 추첨을 통해 선물 지급!</p>
                <p>2022.05.27</p>`
            },
            {
                title: `<p class="slideTitle"
                style='font-size: 30px; font-weight: 700;'>같이 운동 하자!</p>`,
                content: `<p class="slideContent"
                style='font-size: 20px; font-weight: 500;'>사람들과 소통하면서 운동 방법을 공유할 수 있는 커뮤니티 생성!</p>
                <p>2022.05.27</p>`
            },
            {
                title: `<p class="slideTitle"
                style='font-size: 30px; font-weight: 700;'>운동량 측정 해볼래?</p>`,
                content: `<p class="slideContent"
                style='font-size: 20px; font-weight: 500;'>실제 자신이 운동한 운동량을 측정하고, 사람들한테 공유해보세요.</p>
                <p>2022.05.27</p>`
            }
        ]
    })
}
</script>

<style lang="scss" scoped>
.contain{
    position: relative;
    margin-top: 20%;
    .notice{
        position: relative;
        width: 90vw;
        margin: auto;
        margin-top: 10%;
        display: flex;
        justify-content: space-around;
        .line{
            margin-top: 10px;
            width: 70vw;
            height: 3px;
            background-color: rgb(229, 229, 229);
        }
        .noticeTitle{
            font-size: 20px;
            font-weight: 700;
        }
        
    }
    // position: absolute;
    // z-index: 120;
}
@media screen and (max-width: 1300px){
    .contain{
        position: relative;
        margin-top: 10%;
    }
}
</style>