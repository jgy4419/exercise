<template>
    <div class="container">
        <Section1/>
    </div>    
</template>

<script>
import Section1 from './MainSection1.vue'
export default {
    components: {
        Section1
    }
}
</script>

<style lang="scss" scoped>
    .container{
        width: 100vw;
        height: 86vh;
    }
</style>