<template>
    <div class="main">
        <Section1/>
        <Section2/>
        <Section3/>
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
    }
}
</script>

<style lang="scss" scoped>
    .main{
        width: 100vw;
        height: 86vh;
    }
</style>