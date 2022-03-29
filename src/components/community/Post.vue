<template>
    <div class="container">
        <div class="inner">
            <div class="post" v-for="data, i in post.img.length" :key="i"
            @click="urlChange(post.id[i], post.title[i])">
                <div class="titleImg" :style="{backgroundImage: `url(${post.img[i]})`}"/>
                <div class="bottom">
                    <span style="display: none">글 번호 :</span>
                    <h2 class="title"><strong>글 제목 : {{post.title[i]}}</strong></h2>
                    <p>닉네임 / 아이디 : {{post.id[i]}}</p>
                    <p>날짜: 3월 25일</p>
                    <!-- <p>{{$store.state.Search.test}}</p> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    // 데이터가 추가적으로 저장이 되면 
    // test 서버 불러오기 => npx json-server ./exerciseData.json --watch --port 8800
    data(){
        return{
            post: {
                img: [],
                title: [],
                id: [],
                data: [],
                postWrite: []
            }
        }
    },
    props:{
        searchRes: String,
    },
    mounted(){
        this.getPost();
        setTimeout(() => {
            console.log('props', this.searchRes);
        }, 5000);
    },
    methods: {
        getPost(){
            axios.get('http://localhost:8800/post')
            .then(res => {
                console.log(res.data[0].title);
                for(let i = 0; i < res.data.length; i++){
                    this.post.title.push(res.data[i].title);
                    this.post.id.push(res.data[i].id)
                    this.post.img.push(res.data[i].titleImg);
                }
            })
            .catch(err => {console.log(err)})
        },
        urlChange(id, postName){
            location.replace(`/${id}/${postName}`);
        }
    },
    watch: {
        // searchResult의 값이 바뀌면 props로 보낼 값을 변경.. 시키고 싶은데
        searchResult(res){
            console.log('a', res);
        }
    },

}
</script>
<style lang="scss" scoped>
.container{
    position: relative;
    width: 25vw;
    height: 300px;
    .inner{
        position: absolute;
        display: flex;
        justify-content: space-between;
        width: 80vw;
        height: 100%;
        top: 0;
        .post{
            width: 100%;
            height: 100%;
            border: 3px solid rgb(154, 154, 154);
            margin-right: 10px;
            border-radius: 10px;
            cursor: pointer;
            .titleImg{
                border-radius: 5px;
                background-position: center;
                background-repeat: no-repeat;
                background-size: 100%;
                width: 100%;
                height: 50%;
                background-color: rgb(184, 184, 184);
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
}
</style>