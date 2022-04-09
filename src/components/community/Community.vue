<template>
    <div class="contain">
        <div class="inner">
            <header>
                <div class="several">
                    <div class="searchBox">
                        <label><i @click="searchInput" class="fa fa-search search"></i></label>
                        <!-- <input v-model="$store.state.Search.searchValue" class="searchInput" @keyup.enter="searchRes" type="text"/> -->
                        <input @input="searchRes" class="searchInput" type="text"/>
                        {{write}}
                    </div>
                    <router-link class="url" v-for="url, i in headerUrl" :key="i" :to="url">
                        <button :class="btnClass[i]">
                            {{header[i]}}
                        </button>
                    </router-link>
                </div>
            </header>
            <br><hr><br>
            <section>
                <div class="listBox">
                    <button class="list" v-for="sort in category" :key="sort">{{sort}}</button>
                </div>
                <div class="section">
                    <aside class="category">
                        <ul>
                            <li class="liCategory">카테고리</li>
                            <hr>
                            <li class="categoryList" @click="$store.dispatch('Community/categoryChange', {
                                categoryValue: category[i],
                                count: i
                            })"
                             v-for="a, i in categoryCount" :key="i">
                                {{category[i]}}
                            </li>
                        </ul>
                    </aside>
                    <div class="post">
                        <!-- <div v-if="categoryState == 0"> -->
                            <Post :searchValue="searchResult"/>
                        <!-- </div> -->
                        <!-- <div v-if="categoryState == 1">
                            <Post2 :searchValue="searchResult"/>
                        </div>
                        <div v-if="categoryState == 2">
                            <Post3 :searchValue="searchResult"/>
                        </div> -->
                    </div>
                </div>
            </section>
        </div>
                <!-- <Footer/> -->
    </div>    
</template>

<script>
// import axios from 'axios';
import Post from './Post.vue';
// import Post2 from './Post2.vue';
// import Post3 from './Post3.vue';
// import Footer from '../Footer.vue';

import {mapState, mapActions} from 'vuex';
export default {
    components: {
        Post,
        // Post2,
        // Post3
        // Footer,
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
            category: ['post', 'category1', 'category2', 'category3'],
            categoryCount: 4,
        }
    },
    mounted(){
        // console.log('필요해', this.$store.state.Search.searchValue);
        // 로그인한 유저 id를 가져와서 그 값을 url에 넣기. (url은 /myPage/유저이름 이렇게 넣을 예정.)
        // axios.get('http://localhost:8800/post')
        // .then(res => {

        // })
        
        // 검색기능 개발 : 검색 input에 text를 입력하면 input 값과, 서버의 title 값과 비교해서 같은 것만 보여줌.
    },
    computed:{
        ...mapState('Community', ['categoryName', 'categoryState']),
        // ...mapMutations('Community',['categoryNameChange']),
        ...mapActions('Community', ['categoryChange']),
        searchRes: {
            get: function(){
                let a = this.$store.state.Search.searchValue;
                return a;
            },
            set: function(data){
                this.$store.commit('Search/setSearchValue', data);
            },
        }
    },
    methods:{
        searchInput(){
            let searchInput = document.querySelector('.searchInput');
            searchInput.classList.toggle('event');
        },
        tests(){
            console.log(this.test.name);
        }
        // searchRes(){
        //     console.log('event');
        //     get: () => {console.log('!!')}
        //     set: function res(){
        //         console.log('..')
        //     }
        // }
    },
}
</script>

<style lang="scss" scoped>
.contain{
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
                }
                .searchInput{
                    margin: 5px 10px;
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
                    font-weight: 700;
                    background-color: transparent;
                    border: 2px solid #333;
                    border-radius: 30px;
                }
                .btn1:hover{
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
        width: 85%;
        // 고치기..
        height: 160vh;
        margin: auto;
        .write{
            position: absolute;
            bottom: 20%;
        }
        section{
            .listBox{
                position: relative;
                width: 90%;
                margin: auto;
                .list{
                    display: none;
                    margin: 20px 10px;
                    width: 80px;
                    height: 30px;
                    font-size: 12px;
                    border-radius: 30px;
                    border: 0;
                    background-color: #93B5C6;
                    color: #fcf3f3;
                    transition: .5s;
                    cursor: pointer;
                }
            }
            .list:hover{
                background-color: #6d84c9;
                color:#fff;
            }
            .section{
                position: absolute;
                // left: -5%;
                display: flex;
                left: 0;
                .category{
                    width: 10vw;
                    .liCategory{
                        font-size: 15px;
                        font-weight: 700;
                    }
                    .categoryList{
                        cursor: pointer;
                        font-size: 13px;
                        font-weight: 500;
                        margin-top: 10px;
                    }
                    .categoryList:hover{
                        color: rgb(185, 185, 185);
                    }
                }
                .post{
                    margin-left: 100px;
                    // height: 500px;
                    // width: 20vw;
                }
            }
        }
    }
}
@media screen and (max-width: 1000px){
    .contain{
        padding-top: 12%;
        header{
            .several{
                .searchBox{
                    .search{
                        width: 35px;
                        height: 35px;
                        font-size: 16px;
                    }
                }
                .url{
                    .btn1{
                        width: 80px;
                        font-size: 12px;
                    }
                }
            }
        }
        .inner{
            .write{
                bottom: 10%;
            }
            section{
                .category{
                    display: none;
                }
                .listBox{
                    display: flex;
                    .list{
                        display: block;
                        width: 80px;
                        font-size: 13px;
                    }
                }
                .section{
                    .post{
                        margin-left: 0px;
                        // width: 20vw;
                    }
                }
            }
        }
    }
    @media screen and (max-width: 768px){
        .contain{
            .inner{
                .write{
                    bottom: 10%;
                }
                section{
                    .category{
                        display: none;
                    }
                }
            }
        }
    }
}
</style>