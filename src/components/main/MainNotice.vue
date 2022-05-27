<template>
    <vueper-slides
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
            :style="`background-color: ${backgroundImage[i]}`"
        />
    </vueper-slides>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides';
import 'vueperslides/dist/vueperslides.css'
export default {
    components: { VueperSlides, VueperSlide },
    data: () => ({
        backgroundImage: ['#333', '#fff', 'red'],
        pauseOnHover: true,
        autoPlaying: true,
        internalAutoPlaying: true,
        slides: [
            {
                title: `
                    <div class="slide">
                        
                    </div>
                `,
                content: 'Slide title can be HTML.<br>And so does the slide content, <span style="font-size: 1.2em;color: yellow">why not?</span>'
            },
            {
                title: '이벤트2',
                content: 'Slide content.'
            },
            {
                title: '이벤트3',
                content: 'Slide content.'
            }
        ]
    })
}
</script>

<style lang="scss" scoped>
// .slideBox{
//     width: 100vw;
//     height: 30px;
//     .slideInner{
//         width: 100vw;
//         height: 30px;
//     }
// }
</style>