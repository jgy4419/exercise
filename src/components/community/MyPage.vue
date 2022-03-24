<template>
    <div class="myContainer">
        <div class="inner">
            <div class="introduction">
                <div class="profileImg"/> 
                <div class="profileBox">
                    <p class="name">이름</p>
                    <p class="myIntroduction">자기소개</p>
                </div>
            </div>
            <hr>
            <br>
            <div class="posts">
                <Post/>
            </div>
        </div>
    </div>
</template>

<script>
import Post from './Post.vue'
export default {
    components: {
        Post,
    }
}
</script>

<style lang="scss" scoped>
.myContainer{
    width: 100vw;
    .inner{
        width: 70vw;
        // height: 91vh;
        margin: auto;
        .introduction{
            display: flex;
            align-items: center;
            margin: 7% auto;
            .profileImg{
                width: 120px;
                height: 120px;
                border: 1px solid #333;
                border-radius: 50%;
                margin-right: 10%;
            }
            .profileBox{
                .name{
                    font-size: 25px;
                    font-weight: 700;
                    color: #333;
                }
                .myIntroduction{
                    font-size: 20px;
                    font-weight: 500;
                    color: rgb(169, 169, 169);
                }
            }
        }
    }
}
</style>