<template>
    <div class="container">
        <div class="inner">
            <header>
                <div class="several">
                    <div class="searchBox">
                        <label><i @click="searchInput" class="fa fa-search search"></i></label>
                        <input v-model="searchValue" class="searchInput" @keyup.enter="searchRes" type="text"/>
                    </div>
                    <router-link class="url" v-for="url, i in headerUrl" :key="i" :to="url">
                        <button :class="btnClass[i]">
                            {{header[i]}}
                        </button>
                        <!-- <p>{{message}}</p> -->
                    </router-link>
                </div>
            </header>
            <br><hr><br>
            <section>
                <button class="list" v-for="sort in sort" :key="sort">{{sort}}</button>
                <Post :searchValue="searchResult"/>
            </section>
        </div>
    </div>    
</template>

<script>
import axios from 'axios';
// import axios from 'axios';
import Post from './Post.vue';
export default {
    components: {
        Post,
    },
    data(){
        return{
            header: ['새 글 작성', ''],
            btnClass: ['btn1 btn', 'btn2 btn'],
            sort: ['전체', '인기순', '최신순', '댓글순'],
            // myPage/여기에 임시로 jgy4419 넣음.
            headerUrl: ['/write', '/myPage/jgy4419'],
            searchValue: '', // searchInput에 입력하고 enter 누르면 값 변경
            searchResult: '',
        }
    },
    mounted(){
        // 로그인한 유저 id를 가져와서 그 값을 url에 넣기. (url은 /myPage/유저이름 이렇게 넣을 예정.)
        // axios.get('http://localhost:8800/post')
        // .then(res => {

        // })
        
        // 검색기능 개발 : 검색 input에 text를 입력하면 input 값과, 서버의 title 값과 비교해서 같은 것만 보여줌.
    },
    methods:{
        searchInput(){
            let searchInput = document.querySelector('.searchInput');
            searchInput.classList.toggle('event');
        },
        searchRes(){
            console.log(this.searchValue);
            axios.get('http://localhost:8800/post')
            .then(res => {
                // console.log(res.data.title);
                let datas = res.data;
                for(let i = 0; i < datas.length; i++){
                    // console.log(datas[i].title);
                    if(this.searchValue === datas[i].title){
                        this.searchResult = datas[i].title;
                        console.log('??', this.searchResult);
                    }
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.container{
    padding-top: 5%;
    header{
        position: relative;
        width: 100%;
        .several{
            position: absolute;
            display: flex;
            bottom: 0;
            right: 0;
            .searchBox{
                display: flex;
                .search{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 35px;
                    height: 35px;
                    font-size: 20px;
                    border-radius: 50%;
                    border: 2px solid #333;
                    cursor: pointer;
                    transition: .3s;
                    // margin-right: 10px;
                }
                .searchInput{
                    margin: 5px 10px;
                    // display: none;
                    cursor:not-allowed;
                    opacity: 0;
                    width: 100px;
                    height: 25px;
                    transition: .3s;
                    transform: translateX(100px);
                }
                .searchInput.event{
                    cursor: text;
                    opacity: 1;
                    transform: translateX(0px);
                }
            }
            .url{
                .btn{
                    position: relative;
                    margin-left: 30px;
                    z-index: 10;
                    cursor: pointer;
                    transition: .3s;
                }
                .btn1{
                    width: 100px;
                    height: 40px;
                    font-size: 14px;
                    font-weight: 500;
                    background-color: transparent;
                    border: 2px solid #333;
                    border-radius: 30px;
                }
                .btn1:hover{
                    // box-sizing: border-box;
                    background-color: #93B5C6;
                    border: 0px #fff;
                    color: #fcf3f3;
                }
                .btn2{
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: 2px solid #333;
                }
            }
        }
    }
    .inner{
        position: relative;
        width: 80%;
        height: 100vh;
        margin: auto;
        .list{
            margin: 20px 10px;
            width: 100px;
            height: 40px;
            font-size: 15px;
            border-radius: 30px;
            border: 0;
            background-color: #93B5C6;
            color: #fcf3f3;
            transition: .5s;
            cursor: pointer;
        }
        .list:hover{
            background-color: #6d84c9;
            color:#fff;
        }
        .write{
            position: absolute;
            bottom: 20%;
        }
    }
}
</style>