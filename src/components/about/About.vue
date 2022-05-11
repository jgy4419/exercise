<template>
<!-- 개발 이미지 https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgqMWlHPNXtvmxdsi92K0UkXS9UYMFlPatJA&usqp=CAU -->
    <div class="contain">
        <AboutSection1 class="aboutSection1" />
        <AboutSection2 class="aboutSection2" />
        <Footer class="footer"/>
    </div>
</template>

<script>
import AboutSection1 from './AboutSection1.vue';
import AboutSection2 from './AboutSection2.vue';
import Footer from '../Footer.vue';
export default {
    components: {
        AboutSection1,
        AboutSection2,
        Footer,
    }
}
</script>

<style lang="scss" scoped>
.contain{
    width: 100vw;
    // height: 700;
    .aboutSection1{
        height: 70vh;
    }
    .abountSection2{
        height: 50vh;
    }
}
</style>