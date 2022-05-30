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
          exerciseName: '', 
          number_of_sets: 0,
          maximun_value_of_sets: 0,
          minimum_value_of_sets: 0,
          setsTime: '',
          test2: [],
          setsCount:[],
          exerciseMinPower: 0,
          exerciseMaxPower: 0,
          data1: [],
          data2: [],
          data3: [],
          chartColor: ['#3e95cd', '#8e5ea2', '#3cba9f'],
        },
      }
    };
  },
  async mounted(){  
    await axios.get('http://localhost:8000/exercise')
    .then(res => {
      console.log(res);
      // 전체 세트만큼 넣기 (this.setsCount 배열)
      for(let i = 1; i < res.data.number_of_sets + 1; i++){
        this.chart.data.setsCount.push(`${i}세트`);
      }
      console.log(this.chart.data.setsCount);
      
      this.chart.data.nickname = res.data.nickname;
      this.chart.data.exerciseName = res.data.workout_name;
      this.maximun_value_of_sets = res.data.maximun_value_of_sets;
      this.chart.data.minimum_value_of_sets = res.data.minimum_value_of_sets;
      this.chart.data.setsTime = res.data.total_workout_time;
      this.chart.data.exerciseMinPower = res.data.minimum_value_of_sets;
      this.chart.data.exerciseMaxPower = res.data.maximun_value_of_sets;

      // 운동 데이터 들어감.
      res.data.sets[0].emg_data.forEach(element => {
        this.chart.data.data1.push(element)
        console.log(element);
      });
      res.data.sets[1].emg_data.forEach(element => {
        this.chart.data.data2.push(element)
        console.log(element);
      });
      res.data.sets[2].emg_data.forEach(element => {
        this.chart.data.data3.push(element)
        console.log(element);
      });
    }).catch(err => console.log(err));
    this.fillData();
  },
  methods: {
    fillData(){
      // this.setsCount = 
      const ctx = document.getElementById('chart').getContext('2d');
      const dataList = [...this.chart.data.data1];
      // this.chart.data.setsCount 세트 나열,
      // this.chart.data.chart.Color 색 나열
      
      //inaminaworld.tistory.com/184 참고하기
      // for(let i = 0; i < this.chart.data.setsCount; i++){
      //   for(let obj in dataset){
      //     data.push(this.chart.data.data1)
      //   }
      // }
      console.log(dataList);
      this.myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
            datasets: [{
              data: [...this.chart.data.data1],
              label: this.chart.data.setsCount[0],
              borderColor: "#3e95cd",
              fill: false
            }, { 
              data: [...this.chart.data.data2],
              label: this.chart.data.setsCount[1],
              borderColor: "#8e5ea2",
              fill: false
            }, { 
              data: [...this.chart.data.data3],
              label: this.chart.data.setsCount[2],
              borderColor: "#3cba9f",
              fill: false
            }]
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