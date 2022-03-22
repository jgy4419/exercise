<template>
    <div class="container">
        <div class="inner">
            <header>
                <div class="several">
                    <div class="searchBox">
                        <label><i @click="searchInput" class="fa fa-search search"></i></label>
                        <input class="searchInput" type="text"/>
                    </div>
                    <button v-for="header in header" :key="header" class="btn">{{header}}</button>
                </div>
            </header>
            <br><hr><br>
            <section>
                <button class="list" v-for="sort in sort" :key="sort">{{sort}}</button>
                <Post/>
            </section>
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
            header: ['새 글 작성', ''],
            sort: ['전체', '인기순', '최신순', '댓글순']
        }
    },
    methods:{
        searchInput(){
            let searchInput = document.querySelector('.searchInput');
            searchInput.classList.toggle('event');
        }
    }
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
            .btn{
                margin-left: 30px;
                z-index: 10;
                cursor: pointer;
                transition: .3s;
            }
            .btn:nth-child(2){
                width: 100px;
                height: 40px;
                font-size: 16px;
                font-weight: 500;
                background-color: transparent;
                border: 2px solid #333;
                border-radius: 30px;
            }
            .btn:nth-child(3){
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: transparent;
            }
            .btn:nth-child(2):hover{
                box-sizing: border-box;
                background-color: #93B5C6;
                border: 0;
                color: #fcf3f3;
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