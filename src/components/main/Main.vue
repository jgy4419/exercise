<template>
    <div class="container">
        <Section1/>
        <Section2/>
    </div>    
</template>

<script>
import Section1 from './MainSection1.vue'
import Section2 from './MainSection2.vue'
export default {
    components: {
        Section1,
        Section2,
    }
}
</script>

<style lang="scss" scoped>
    .container{
        width: 100vw;
        height: 86vh;
    }
</style>