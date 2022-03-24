<template>
    <div class="container">
        <div class="inner">
            <router-link to="/board/:id">
                <div class="titleImg"/>
                <div class="bottom">
                    <span style="display: none">글 번호</span>
                    <h2 class="title"><strong>글 제목</strong></h2>
                    <p>닉네임 / 아이디</p>
                    <p>날짜</p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    // 데이터가 추가적으로 저장이 되면 
}
</script>
<style lang="scss" scoped>
.container{
    position: relative;
    width: 25vw;
    height: 300px;
    border: 3px solid rgb(154, 154, 154);
    border-radius: 10px;
    .inner{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        .titleImg{
            border-radius: 5px;
            background-image: url('https://health.chosun.com/site/data/img_dir/2018/03/07/2018030700812_2.jpg');
            background-position: center;
            background-size: 100%;
            width: 100%;
            height: 50%;
            // background-color: rgb(184, 184, 184);
            transition: .3s;
        }
        .titleImg:hover{
            background-size: 120%;
        }
        .bottom{
            width: 90%;
            margin: auto;
        }
    }
}
</style>