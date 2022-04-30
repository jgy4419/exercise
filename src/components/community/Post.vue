<template>
    <div class="contain">
        <div id="categoryName">{{$store.state.Community.categoryName}}</div>
        <div class="inner">
                <div class="post" v-for="data, i in post.title.length" :key="i"
                @click="urlChange(post.id[i], post.title[i])">
                    <div class="titleImg" :style="{backgroundImage: `url(${post.img[i]})`}"/>
                    <div class="bottom">
                        <h3 class="title"><strong>글 제목 : {{post.title[i]}}</strong></h3>
                        <p>닉네임 / 아이디 : {{post.id[i]}}</p>
                        <p>날짜: {{post.date[i]}}</p>
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
            post: {
                img: [],
                title: [],
                id: [],
                date: [],
                postWrite: [],
            },
            searchRes: this.$store.state.Search.searchValue,
            postCount: 0,
            category: ['all', 'category1', 'category2', 'category3'],
            // test: this.$store.state.Search.searchRes,
        }
    },
    computed: {
        ...mapState('Community', ['categoryName', 'categoryState', 'post']),
        // ...mapState('Search', ['searchRes']),
        ...mapState('Search', ['searchRes']),
    },
    props:{
        propsRes: String,
    },
    watch: {
        // vuex의 categoryName값이 변경되면 getPost(데이터 불러오는 함수)를 호출한다.
        categoryName(){
            this.getPost();
        },
        // 검색창이 변경될 때마다 
        propsRes(result){
            // search 값이 변경되면, 데이터 들을 불러와서 post img, title, id 등에 각각 넣어주기.
            console.log(result);
            axios.get('/api/searchtitle', {
                // 이거.. 추가해야됨
                params: {title: result}}, 
                {withCredentials: true})
            .then(res => {
                this.post.title = [];
                this.post.id = [];
                this.post.img = [];
                this.post.date = [];
                console.log('결과는', res.data);

                for(let i = 0; i < res.data.length; i++){
                    console.log('결과로 나온 제목', res.data[i].title);
                    this.post.title.push(res.data[i].title);
                    this.post.id.push(res.data[i].nickname);
                    this.post.date.push(res.data[i].creation_datetime)
                    // this.post.img.push(res.data[i].titleImg);
                    if(result === ''){
                        this.getPost();
                        break;
                    }
                }
            }).catch(err => console.log(err));
            // 테스트 데이터
            // axios.get('http://localhost:8800/all')
            // .then(res => {
            //     this.post.title = [];
            //     this.post.id = [];
            //     this.post.img = [];
            //     for(let i = 0; i < res.data.length; i++){
            //         // 전체 게시물 중 검색 내용과 일치하는 것이 있으면 그 데이터들을 뽑아와서 넣어줌.
            //         if(result === res.data[i].title){
            //             this.post.title.push(res.data[i].title);
            //             this.post.id.push(res.data[i].id);
            //             this.post.img.push(res.data[i].titleImg);
            //             console.log(res.data[i].title);
            //         }else if(result === ''){
            //             this.getPost();
            //             break;
            //         }
            //     }
            // })
        }

    },
    mounted(){
        this.getPost();
    },
    methods: {
        /* 
            getPost()함수가 호출될 때마다. post.title, id, img는 초기값을 빈 배열로 시작.
            빈 배열로 초기화 시켜주지 않으면 누적돼서 값이 생기는 문제가 생김.
        */
        getPost(){
            this.post.title = [];
            this.post.id = [];
            this.post.img = [];
            // getPost가 실행될 때마다 데이터의 주소가 this.categoryName 즉, 클래스 이름이 categoryName과 동일한 데이터들을 불러옴.
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
            axios.get(`http://localhost:8800/${this.categoryName}`)
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

}
</script>
<style lang="scss" scoped>
.contain{
    position: relative;
    // width: 100vw;
    // width: 25vw;
    height: 300px;
    #categoryName{
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
                    position: fixed;
                    bottom: 50px;
                    left: 0;
                    right: 0;
                    margin: auto;
                    font-size: 16px;
                    font-weight: 700;
                    width: 100px;
                    height: 40px;
                    border-radius: 30px;
                    transition: .5s;
                    cursor: pointer;
                    background-color: #93B5C6;
                    color: #fff;
                    border: 0;
                }
            }
        }
    }
    @media screen and (max-width: 1000px){
        #categoryName{
            font-size: 25px;
            font-display: 700;
        }
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