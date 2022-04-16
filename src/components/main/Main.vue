<template>
    <div class="main">
        <div class="section">
            <Section1/>
            <button @click="cookie()">testBtn</button>
            <Section2/>
            <Section3/>
        </div>
        <button class="upBtn" @click="scrollUp"><i class='fa fa-arrow-up'></i></button>
    </div>    
</template>

<script>
import Section1 from './MainSection1.vue'
import Section2 from './MainSection2.vue'
import Section3 from './MainSection3.vue'
export default {
    components: {
        Section1,
        Section2,
        Section3,
    },
    methods: {
        scrollUp(){
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        },
        cookie(){
            // 지금부터 하루 후 까지 쿠키 유지.
            let date = new Date(Date.now() + 86400e3);
            date = date.toUTCString();
            document.cookie = "user=jgy; expires=" + date;
            location.reload();
        }
    }
}
</script>

<style lang="scss" scoped>
    .main{
        .section {
            position: relative;
            width: 100vw;
            height: 86vh;
        }
        .upBtn{
            position: fixed;
            z-index: 10;
            bottom: 10%;
            right: 10%;
            // background-color: #93B5C6;
            background-color: transparent;
            color: #333;
            // color: #fff;
            width: 50px;
            height:50px;
            font-size: 16px;
            border: 0;
            // border: 3px solid rgb(220, 220, 220);
            box-shadow: 4px 12px 30px 6px rgb(231, 231, 231);
            border-radius: 10px;
        }
    }
</style>