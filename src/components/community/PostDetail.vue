<template>
    <div class="contain">
        <div class="detail">
            <div class="postImg">
                <div class="user">
                    <p class="title">{{post.title}}</p>
                    <br/>
                    <div class="information">
                        <p class="id">{{post.userId}}</p>
                        <p class="date">게시물 올린 날짜</p>
                    </div>
                </div>
            </div>
        </div>   
        <div class="inner">
            <p>{{post.postDetail}}</p>
            <hr>
            <div class="commentList">
                <div class="comments" v-for="data, i in comment.userId.length" :key="i">
                    <p class="commentUserId">{{comment.userId[i]}}</p>
                    <p class="commentTitle">{{comment.commentDetail[i]}}</p>
                    <div class="line"/>
                </div>
            </div>
            <hr/>
            <div class="comment">
                <label for="commentInput">댓글 쓰기</label><br/>
                <textarea type="text" placeholder = "댓글을 입력해주세요." id="commentInput"/>
            </div>
        </div>
    </div> 
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            post: {
                title: '',
                titleImg: '',
                userId: '',
                date: '',
                postDetail: ''
            },
            comment: {
                userId: [],
                commentDetail: []
            }
        }
    },
    mounted(){
        // console.log($route.params.id);
        // url의 값을 가져와서 해당 게시글의 글 내용 넣어주기.
        axios.get('http://localhost:8800/all')
        .then(res => {
            for(let i = 0; i < res.data.length; i++){
                console.log(res.data[i]);
                console.log(res.data[i].id);
                if(this.$route.params.post === res.data[i].title && this.$route.params.id === res.data[i].id){
                    this.post.title = res.data[i].title;
                    this.post.userId = res.data[i].id;
                    this.post.postDetail = res.data[i].postWrite;
                }
            }
        })
        .catch(err => {console.log(err)})

        // 해당 게시글의 댓글 넣어주기.
        axios.get('http://localhost:8800/comment')
        .then(res => {
            console.log(res.data);
            let datas = res.data;
            datas.map(e => {
                this.comment.userId.push(e.userID);
                this.comment.commentDetail.push(e.commentDetail);
            })
        })
        .catch(err => {console.log(err);})
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.contain{
    .detail{
        position: relative;
        margin-top: 3%;
        .postImg{
            width: 100%;
            height: 300px;
            background-color: rgb(227, 227, 227);
        }
        .user{
            position: absolute;
            width: 80%;
            margin: auto;
            left: 0;
            right: 0;
            color: #333;
            .title{
                font-size: 50px;
                font-weight: 700;
            }
            .information{
                display: flex;
                .id{
                    margin-right: 20px;
                }
            }
        }
    }
    .inner{
        width: 80vw;
        margin: auto;
        .commentList{
            margin-top: 50px;
            padding: 20px;
            border-radius: 10px;
            width: 80vw;
            min-height: 200px;
            background-color: rgb(243, 243, 243);
            .commentTitle{
                font-size: 14px;
                font-weight: 700;
            }
            .line{
                margin-top: 10px;
                margin-bottom: 10px;
                width: 100%;
                height: 0.5px;
                background-color: #333;
            }
        }
        .comment{
            width: 80vw;
            height: 30px;
            // display: flex;
            justify-content:space-between;
            margin-bottom: 100px;
            #commentInput{
                position: absolute;
                left: 0;
                right: 0;
                margin: 15px auto;
                padding: 10px;
                width: 80%;
                height: 50px;
            }
        }
    }
}
</style>

