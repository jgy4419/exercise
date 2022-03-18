<template>
    <div class="container">
        <div class="inner">
            <header>
                <button class="list" v-for="header in header" :key="header">{{header}}</button>
            </header>
            <Post/>
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
            header: ['전체', '인기순', '최신순', '댓글순']
        }
    }
}
</script>

<style lang="scss" scoped>
.container{
    padding-top: 5%;
    .inner{
        width: 80%;
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
    }
}
</style>