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
import axios from 'axios';
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
        axios.get('http://localhost:8800/user')
        .then(res => {
            console.log(res.data[0]);
            let data = res.data[0];
            this.information.img = data.profileImg;
            this.information.name = data.name;
            this.information.introduction = data.introduction;
        }).catch(err => {
            console.log(err);
        })
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