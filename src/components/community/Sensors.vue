<template>
    <div>
        센서 데이터
    </div>
</template>
<script>
import axios from 'axios';
export default {
    mounted(){
        let userInformation = JSON.parse(localStorage.getItem('userInformation'));
        console.log(userInformation.nickname);
        axios.get('/api/sensorData', {params: {nickname: userInformation.nickname}})
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
}
</script>

<style lang="scss" scoped>

</style>