<template>
    <div class="contain">
        <p class="categoryName">{{$store.state.Community.categoryName}}</p>
        <div class="inner">
                <div class="post" v-for="data, i in post.img.length" :key="i"
                @click="urlChange(post.id[i], post.title[i])">
                    <div class="titleImg" :style="{backgroundImage: `url(${post.img[i]})`}"/>
                    <div class="bottom">
                        <h3 class="title"><strong>글 제목 : {{post.title[i]}}</strong></h3>
                        <p>닉네임 / 아이디 : {{post.id[i]}}</p>
                        <p>날짜: 3월 25일</p>
                        {{searchRes}}
                        <p>{{$store.state.Search.searchValue}}</p>
                    </div>
                </div>
            <div class="btnBox">
                <button @click="moreData" class="moreBtn">더 보기</button>
            </div>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
import {mapState} from 'vuex';
export default {
    // 데이터가 추가적으로 저장이 되면 
    // test 서버 불러오기 => npx json-server ./exerciseData.json --watch --port 8800
    data(){
        return{
            // post: {
            //     img: [],
            //     title: [],
            //     id: [],
            //     data: [],
            //     postWrite: [],
            // },
            // searchRes: this.$store.state.Search.searchValue,
            // postCount: 0,
            category: ['post', 'category1', 'category2', 'category3'],

        }
    },
    computed: {
        ...mapState('Community', ['categoryName', 'categoryState', 'post']),
    },
    watch: {
        // vuex의 categoryName값이 변경되면 데이터 변경해서 불러옴.
        categoryName(){
            this.$store.dispatch('Community/dataGet');
            // this.dataGet(this.categoryName)
        }
    },
    props:{
        // searchRes: String,
    },
    mounted(){
        // this.$store.dispatch('Community/categoryChange')
        // this.getPost();
        this.apply()
    },
    methods: {
        apply(){
            this.$store.commit('Community/setData');
        },
        getPost(){
            // $store.state.Search.searchValue 이 값이 검색창에 검색어를 입력하면 값이 같이 변경됨.
            axios.get(`http://localhost:8800/${this.categoryName}`)
            .then(res => {
                // 만약 전체 게시물이 10개 이하면 전체 게시물의 총 개수만 불러오기.
                if(res.data.length < 10){
                    console.log('10개 이하', res.data.length);
                    for(let i = 0; i < res.data.length;  i++){
                        this.post.title.push(res.data[i].title);
                        this.post.id.push(res.data[i].id)
                        this.post.img.push(res.data[i].titleImg);
                        this.postCount += 1;
                        console.log(this.postCount);
                    } 
                }else if(res.data.length > 10){
                    // 총 게시물이 10개가 넘으면 10개 까지만 불러오기.
                    console.log('10개 이상', res.data.length);
                    for(let i = 0; i < 10; i++){
                        this.post.title.push(res.data[i].title);
                        this.post.id.push(res.data[i].id)
                        this.post.img.push(res.data[i].titleImg);
                        this.postCount += 1;
                        console.log(this.postCount);
                    }
                }
            })
            .catch(err => {console.log(err)});
            console.log(this.postCount);
        },
        urlChange(id, postName){
            location.href = `/${id}/${postName}`;
        },
        // 데이터 더 보기 버튼 기능.
        moreData(){
            console.log('더 보기', this.postCount);
            // ex) 10개 post를 추가적으로 더 가져오기.
            axios.get('http://localhost:8800/post')
            .then(res => {  
                // 게시물 개수가 postCount개수 + 10개 보다 많으면 
                for(let i = this.postCount; i < this.postCount + 10; i++){
                    this.post.title.push(res.data[i].title);
                    this.post.id.push(res.data[i].id)
                    this.post.img.push(res.data[i].titleImg);
                    this.postCount += 1;
                    console.log(this.postCount);
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    // watch: {
    //     // searchResult의 값이 바뀌면 props로 보낼 값을 변경.. 시키고 싶은데
    //     // searchResult(res){
    //     //     console.log('a', res);
    //     // }
    // },

}
</script>
<style lang="scss" scoped>
.contain{
    position: relative;
    // width: 100vw;
    // width: 25vw;
    height: 300px;
    .categoryName{
        font-size: 30px;
        font-weight: 700;
        margin-top: -20px;
    }
    .inner{
        position: absolute;
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-between;
        width: 70vw;
        height: 100%;
        top: 0;
        .post{
            width: 300px;
            height: 100%;
            box-shadow: 4px 12px 30px 6px rgb(231, 231, 231);
            margin-right: 20px;
            margin-top: 50px;
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
            .btnBox{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 40%;
                .moreBtn{
                    background-color: transparent;
                    font-size: 18px;
                    font-weight: 700;
                    width: 150px;
                    height: 60px;
                    box-shadow: 4px 12px 30px 6px rgb(231, 231, 231);
                    border-radius: 30px;
                    transition: .5s;
                    cursor: pointer;
                }
            }
            .moreBtn:hover{
                background-color: #93B5C6;
                color: #fff;
                border: 0;
            }
        }
    }
    @media screen and (max-width: 1000px){
        .inner{
            display: block;
            .post{
                width: 120%;
                .title{
                    font-size: 20px;
                }
                p{
                    font-size: 13px;
                    font-weight: 500;
                }
            }
        }
    }
    // @media screen and (max-width: 768px){
    //     .inner{
    //         display: block;
    //         .post{
    //             width: 90%;
    //         }
    //     }
    // }
}
</style>