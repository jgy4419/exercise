<template>
    <div class="container">
        <div class="inner">
            <div class="titleImg"/>
            <div class="bottom">
                <h2 class="title"><strong>글 제목</strong></h2>
                <p>닉네임 / 아이디</p>
                <p>날짜</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // signin 브랜치 test
}
</script>
<style lang="scss" scoped>
.container{
    position: relative;
    width: 25vw;
    height: 30vh;
    border: 3px solid rgb(154, 154, 154);
    border-radius: 10px;
    .inner{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        .titleImg{
            border-radius: 5px;
            width: 100%;
            height: 40%;
            background-color: rgb(184, 184, 184);
        }
        .bottom{
            width: 90%;
            margin: auto;
        }
    }
}
</style>