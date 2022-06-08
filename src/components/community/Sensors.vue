<template>
    <div class="contain">
        <p class="title">센서 데이터</p>
        <p>보고싶은 데이터를 고르세요!</p>
        <button>날짜로 보기</button>
        <button>파일 명으로 보기</button>
        <br/>
        <!-- date 값을 받고 닉네임이랑, 날짜가 동일한 차트 불러오도록 하기. -->
        <input type="date"/>
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