<template>
    <div class="contain">
        <p class="title">센서 데이터</p>
        <div class="charts">
            <Chart/>
        </div>
    </div>
</template>
<script>
import Chart from '../Chart.vue';
// import axios from 'axios';
export default {
    data(){
        return{
            emgDatas: [],
        }
    },
    components: {
        Chart
    }
}
</script>

<style lang="scss" scoped>
.contain {
    position: relative;
    width: 100%;
    height: 800px;
    bottom: 40px;
    .title{
        font-size: 30px;
        font-weight: 700;
    }
    .charts{
        margin-top: 8%;
    }
}
</style>