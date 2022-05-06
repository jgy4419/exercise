<template>
    <div class="myContainer">
        <div class="inner">
            <div class="introduction">
                <div class="profileImg" :style="{backgroundImage: `url(${information.img})`}"/> 
                <div class="profileBox">
                    <p class="name">{{information.name}}</p>
                    <p class="myIntroduction">{{information.introduction}}</p>
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
    },
    data(){
        return{
            information: {
                img: '',
                name: '',
                introduction: ''
            }
        }
    },
    mounted(){
        // 만약 쿠키가 있으면
        let userInformation = JSON.parse(localStorage.getItem("userInformation"));

        if(document.cookie){
            this.information.img = userInformation.profile_img_path;
            this.information.name = userInformation.nickname;
            this.information.introduction = userInformation.introduction;
        }
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
                border: 3px solid rgb(224, 224, 224);
                border-radius: 50%;
                margin-right: 10%;
                background-size: cover;
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