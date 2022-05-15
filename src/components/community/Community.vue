<template>
    <div class="contain">
        <div class="inner">
            <header>
                <div class="several">
                    <div class="searchBox">
                        <label><i @click="searchInput" class="fa fa-search search"></i></label>
                        <input @keyup.enter="$store.dispatch('Search/searchAction', {
                            inputRes: this.searchResult
                        })" v-model="searchResult" class="searchInput" type="text"/>
                        {{searchRest}}
                    </div>
                    <router-link class="url" v-for="url, i in headerUrl" :key="i" :to="url">
                        <button @click="informationUrl()" :class="btnClass[i]">
                            {{header[i]}}
                        </button>
                    </router-link>
                    <div class="menuList">
                        <ul>
                            <router-link v-for="url2, i in menuList.url.length" :key="i"
                            :to="menuList.url[i]">
                                <li @click="informationUrl()">{{menuList.text[i]}}</li>
                            </router-link>
                        </ul>
                    </div>
                </div>
            </header>
            <br><hr><br>
            <section>
                <div class="listBox">
                    <button class="list" v-for="category, i in category" :key="i"
                        @click="$store.dispatch('Community/categoryChange', {
                            categoryValue: category,
                            count: i
                        })">
                        {{category}}
                    </button>
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
                        <!-- 관리자 카테고리 수정 -->
                        <div class="setCategory" v-if="manager">
                            <div v-for="managerInput, i in managerInput" :key="i">
                                <label for="addCategory">{{managerInput}}</label><input @keyup.enter="categoryAdd()" v-model="categoryVal[i]" id="addCategory"/>
                            </div>
                        </div>
                    </aside>
                    <div class="post">
                        <Post 
                        :propsRes="propsRes"/>
                    </div>
                </div>
            </section>
        </div>
    </div>    
</template>

<script>
import Post from './Post.vue';
import {mapState, mapActions} from 'vuex';
import axios from 'axios';
// import axios from 'axios';
export default {
    components: {
        Post,
    },
    computed:{
        ...mapState('Community', ['categoryName', 'categoryState']),
        ...mapState('Search', ['searchRes']),
        ...mapState('User', ['storeGrantion_level']),
        ...mapActions('Community', ['categoryChange']),
    },
    data(){
        return{
            header: ['새 글 작성', ''],
            btnClass: ['btn1 btn', 'btn2 btn'],
            sort: ['전체', '인기순', '최신순', '댓글순'],
            // myPage/여기에 임시로 jgy4419 넣음.
            headerUrl: ['/write', ''],
            searchValue: '', // searchInput에 입력하고 enter 누르면 값 변경
            category: ['all', 'category1', 'category2', 'category3'],
            categoryCount: 4,
            searchResult: '', // input 창 누르는 중일 때
            res: '', // input 창 입력 끝났을 때
            // 검색 결과에 반환된 포스트들 넣어주기.
            searchs: {
                searchTitle: [],
                searchId: [],
                searchImg: [],
            },
            propsRes: '',
            menuList: {
                text: ['MyPage', '설정'],
                url: ['', ''],
            },
            manager: false,
            managerInput: ['카테고리 추가', 'code', 'availability'],
            categoryVal: ['', '', ''], 
        }
    },
    mounted(){
        // community 페이지에 돌아오거면 검색 창 빈칸으로 변경시켜주기.
        this.$store.dispatch('Search/searchAction', {
            inputRes: ''
        })

        console.log(this.storeGrantion_level);
        // 로컬스토리지의 유저 정보를 가져옴.
        // let userInformation = JSON.parse(localStorage.getItem('userInformation'));
        // 유저 정보 중 grant가 1이면 관리자
        if(this.storeGrantion_level === 0){ 
            this.manager = true;
        }else{
            this.manager = false;
        }

        // 검색기능 개발 : 검색 input에 text를 입력하면 input 값과, 서버의 title 값과 비교해서 같은 것만 보여줌.
        let roundProfile = document.querySelector('.btn2');
        roundProfile.addEventListener('click', function(){
            // 누르면 리스트 생성.
            let menuList = document.querySelector('.menuList');
            menuList.classList.toggle('event');
        })


    },
    watch: {
        searchRes(res){
            console.log('vuex input 데이터', res)
            this.propsRes = res;
        }
    },
    methods:{
        searchInput(){
            let searchInput = document.querySelector('.searchInput');
            searchInput.classList.toggle('event');
        },
        categoryAdd(){
            // console.log('category추가 user는', this.$store.state.User.storeMail);
            axios.post('/api/createBoard', {
                member_id: this.$store.state.User.storeMail, 
                board_name: this.categoryVal[0],
                code: this.categoryVal[1],
                availability: this.categoryVal[2]
            })
            .then(res => {console.log(res)})
            .catch(err => console.log(err))
        },
        informationUrl(){
            if(!document.cookie){
                alert('로그인 후 이용해주세요!')
                this.headerUrl = ['/login', ''];
                this.menuList.url = ['/login', '/login'];
            }else{
                this.headerUrl = ['/write', ''];
                this.menuList.url = ['/mypage', '/settings'];
            }
        }
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
            .menuList{
                display: none;
                background-color: rgb(243, 240, 240);
                position: absolute;
                text-align: left;
                width: 150px;
                height: 80px;
                right: 0;
                top: 50px;
                // border: 1px solid #333;
                ul{
                    position: absolute;
                    margin-left: -20px;
                    width: 100%;
                    li{
                        margin-top: 8px;
                        height: 30px;
                        font-size: 17px;
                    }
                }
            }
            .menuList.event{
                display: block;
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
            width: 100%;
            height: 100%;
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
                .setCategory{
                    margin-top: 50px;
                }
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