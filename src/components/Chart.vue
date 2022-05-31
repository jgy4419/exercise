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
          dataValuess: {
            data1: [],
            data2: [],
            data3: [],
          },

          // dataValues: [],
          chartColor: ['#3e95cd', '#8e5ea2', '#3cba9f'],
        },
      },
      dataSets: []
    };
  },
   async mounted(){  
    await axios.get('http://localhost:8000/exercise')
    .then(res => {
      console.log(res.data.sets[0].emg_data);
      // 전체 세트만큼 넣기 (this.setsCount 배열)
      for(let i = 1; i < res.data.number_of_sets + 1; i++){
          this.chart.data.setsCount.push(`${i}세트`);
      }
      
      this.chart.data.nickname = res.data.nickname;
      this.chart.data.exerciseName = res.data.workout_name;
      this.maximun_value_of_sets = res.data.maximun_value_of_sets;
      this.chart.data.minimum_value_of_sets = res.data.minimum_value_of_sets;
      this.chart.data.setsTime = res.data.total_workout_time;
      this.chart.data.exerciseMinPower = res.data.minimum_value_of_sets;
      this.chart.data.exerciseMaxPower = res.data.maximun_value_of_sets;

      // for(let i = 0; i < res.data.number_of_sets; i++){
      //   res.data.sets[i].emg_data.forEach(element => {
      //     // this.chart.data.dataValues.push(element);
      //     this.chart.data.dataValues.push(element)
      //     console.log(element);
      //   });
      // }
      // console.log('추가된 key 값', this.chart.data.dataValues);


      // 운동 데이터 들어
      res.data.sets[0].emg_data.forEach(element => {
        this.chart.data.dataValuess.data1.push(element)
        console.log(element);
      });
      res.data.sets[1].emg_data.forEach(element => {
        this.chart.data.dataValuess.data2.push(element)
        console.log(element);
      });
      res.data.sets[2].emg_data.forEach(element => {
        this.chart.data.dataValuess.data3.push(element)
        console.log(element);
      });

      // for(let i = 0; i < 3; i++){
      //   datasets = {
      //     // data: this.chart.data.data1,
      //     label: this.chart.data.setsCount[i],
      //     borderColor: this.chart.data.chartColor[i],
      //     fill: false
      //   }
      //   this.dataSets.push(datasets);
      // }
    }).catch(err => console.log(err));
    this.fillData();
  },
  methods: {
    fillData(){
      let datas;
      // let label;
      // let borderColor;
      // let fill;
      // for(datas in this.chart.data.dataValuess){
      //   console.log(`${datas}: ${this.chart.data.dataValuess[datas]}`);
      // }
      // console.log(this.chart.data.dataValuess[datas]);
      let dataLists = [];
      // let dataValues = this.chart.data.dataValues;
      let datasets;
      // console.log(dataValues);
      for(let i = 0; i < 3; i++){
        datasets = {
          label: this.chart.data.setsCount[i],
          borderColor: this.chart.data.chartColor,
          fill: false 
        }
        dataLists.push(datasets);
      }
        for(datas in this.chart.data.dataValuess){
            datas = this.chart.data.dataValuess[datas];
            datasets = {
              data: datas
            }
            dataLists.push(datasets);
            console.log(datas);
        }
      
      const ctx = document.getElementById('chart').getContext('2d');
      console.log(dataLists);
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
//   async mounted(){  
//     // let a = {
//     //   b: 1,
//     //   c: 2,
//     //   d: 3
//     // }
//     // for(let i = 0; i < 3; i++){
//     //   console.log(a);
//     // }


//     await axios.get('http://localhost:8000/exercise')
//     .then(res => {
//       console.log(res);
//       // 전체 세트만큼 넣기 (this.setsCount 배열)
//       for(let i = 1; i < res.data.number_of_sets + 1; i++){
//         this.chart.data.setsCount.push(`${i}세트`);
//       }
//       console.log(this.chart.data.setsCount);
      
//       this.chart.data.nickname = res.data.nickname;
//       this.chart.data.exerciseName = res.data.workout_name;
//       this.maximun_value_of_sets = res.data.maximun_value_of_sets;
//       this.chart.data.minimum_value_of_sets = res.data.minimum_value_of_sets;
//       this.chart.data.setsTime = res.data.total_workout_time;
//       this.chart.data.exerciseMinPower = res.data.minimum_value_of_sets;
//       this.chart.data.exerciseMaxPower = res.data.maximun_value_of_sets;

//       // 운동 데이터 들어감.
//       res.data.sets[0].emg_data.forEach(element => {
//         this.chart.data.data1.push(element)
//         console.log(element);
//       });
//       res.data.sets[1].emg_data.forEach(element => {
//         this.chart.data.data2.push(element)
//         console.log(element);
//       });
//       res.data.sets[2].emg_data.forEach(element => {
//         this.chart.data.data3.push(element)
//         console.log(element);
//       });
//     }).catch(err => console.log(err));
//     this.fillData();
//   },
//   methods: {
//     fillData(){
//       // this.setsCount = 
//       const ctx = document.getElementById('chart').getContext('2d');
//       const dataList = [...this.chart.data.data1];
//       console.log(dataList);
//       let dataArray = [];
//       for(let i = 0; i < 3; i++){
//         let data = {
//           data: [50, 12, 4, 90, 123, 31, 4],
//           label: this.chart.data.setsCount[0],
//           boarderColor: "#3e95cd",
//           fill: false
//         }
//         dataArray.push(data);
//       }
//       console.log(dataArray);
//       this.myChart = new Chart(ctx, {
//           type: 'line',
//           data: {
//             labels: [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
//             datasets: 
//               // [...dataArray]
//               [{
//                 data: [...this.chart.data.data1],
//                 label: this.chart.data.setsCount[0],
//                 borderColor: "3e95cd",
//                 fill: false
//               },{
//                 data: [...this.chart.data.data2],
//                 label: this.chart.data.setsCount[1],
//                 borderColor: "#8e5ea2",
//                 fill: false
//               },{
//                   data: [...this.chart.data.data3],
//                 label: this.chart.data.setsCount[2],
//                 borderColor: "#3cba9f",
//                 fill: false
//               }
//               ]
            
//           },
//           options: {
//             title: {
//               display: true,
//               text: 'World population per region (in millions)'
//             }
//           }
//         }
//       );
//     }
//   }
// }
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