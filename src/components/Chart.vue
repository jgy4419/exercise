<template>
  <div>
    <p class="exerciseName">{{chart.data.exerciseName}}</p>
    <canvas class="chart" id = "chart" width="1000" height="200"></canvas>
  </div>
</template>

<script>
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
export default {
  data(){
    return{
      myChart: null,
      chart: {
        data: {
          nickname: '',
          // 운동 이름
          exerciseName: '',
          maximun_value_of_sets: 0,
          minimum_value_of_sets: 0,
          setsTime: '',
          setsCount:[],
          exerciseMinPower: 0,
          exerciseMaxPower: 0,
          // 운동한 근전도 센서 값 모두 가져오기.
          dataValues: [],
          // 몇 세트 했는지 숫자
          setCount: 0,
          // 차트 색
          chartColor: ['#3e95cd', '#8e5ea2', '#3cba9f'],
        },
      },
      dataSets: []
    };
  },
   async mounted(){  
    await axios.get('http://localhost:8000/exercise')
    .then(res => {
      console.log(res.data);
      // 전체 세트만큼 넣기 (this.setsCount 배열)
      for(let i = 1; i < res.data.number_of_sets + 1; i++){
          this.chart.data.setsCount.push(`${i}세트`);
      }
      this.chart.data.setCount = res.data.number_of_sets;
      this.chart.data.exerciseName = res.data.workout_name;

      // 운동 데이터 들어
      for(let i = 0; i < this.chart.data.setCount; i++){
        res.data.sets[i].emg_data.forEach(element => {
          this.chart.data.dataValues.push(element)
        });
      }
    }).catch(err => console.log(err));
    this.fillData();
  },
  methods: {
    fillData(){
      let dataLists = [];
      let datasets = this.chart.data.dataValues;
      let result = [];
      // 전체 운동한 근전도 센서 값의 개수만큼 반복 세트당 10번 측정하므로 10씩 증가(변경할 수도 있음)
      for(let i = 0; i < this.chart.data.dataValues.length; i+= 10){
        // result 값에 근전도 측정 값 전체 값의 10개씩 빼와서 result에 저장.
        result.push(this.chart.data.dataValues.slice(i, i + 10));
      }

      for(let i = 0; i < this.chart.data.setCount; i++){
        datasets = {
          label: this.chart.data.setsCount[i],
          data: result[i],
          borderColor: this.chart.data.chartColor,
          fill: false 
        }
        dataLists.push(datasets);
      }
      const ctx = document.getElementById('chart').getContext('2d');
      this.myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
            datasets: [...dataLists]
          },
          options: {
            title: {
              display: true,
              text: 'World population per region (in millions)'
            }
          }
        }
      );
    }
  }
}
</script>

<style lang="scss" scoped>
div{
  color: rgba(219, 252, 171, 0.2);
  .exerciseName{
    font-weight: 700;
    font-size: 20px;
    color: #333;
  }
}
</style>