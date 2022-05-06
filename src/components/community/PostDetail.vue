<template>
    <div class="contain">
        <div class="detail">
            <div class="postHeader">
                <div class="postImg" :style="{backgroundImage: `url(${post.titleImg}`}"/>
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
                <label for="commentInput">댓글 쓰기</label><br/><br/>
                <div class="commentBox">
                    <textarea type="text" v-model="commentInput" placeholder="댓글을 입력해주세요." id="commentInput"/> <br/><br/>
                    <button class="btn" @click="commentUpdate()">게시</button>
                </div>
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
            },
            commentInput: '',
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
                    this.post.titleImg = res.data[i].titleImg;
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
        commentUpdate(){
            // 현재 날짜, 시간 가져오기
            let today = new Date();   

            let year = today.getFullYear(); // 년도
            let month = today.getMonth() + 1;  // 월
            let date = today.getDate();  // 날짜
            let day = today.getDay();  // 요일
            let hours = today.getHours(); // 시
            let minutes = today.getMinutes();  // 분
            let seconds = today.getSeconds();  // 초
            console.log(`${year}년 ${month}월 ${date}일 ${day} ${hours}시 ${minutes}분 ${seconds}초`);
            // this.commentInput 값을 넣어주기. (유저아이디, 게시글 제목)
            // axios.post('')
        }
    }
}
</script>

<style lang="scss" scoped>
.contain{
    .detail{
        position: relative;
        margin-top: 3%;
        .postHeader{
            width: 100%;
            height: 300px;
            .postImg{
                position: absolute;
                width: 100%;
                height: 100%;
                background: rgb(227, 227, 227);
                background-repeat: no-repeat;
                background-size: cover;
                filter: brightness(0.70);
            }
            .user{
                position: absolute;
                width: 80%;
                margin: auto;
                left: 0;
                right: 0;
                color: #333;
                .title{
                    color: rgb(239, 239, 239);
                    font-size: 50px;
                    font-weight: 700;
                }
                .information{
                    color: rgb(214, 214, 214);
                    display: flex;
                    .id{
                        margin-right: 20px;
                    }
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
            margin-bottom: 120px;
            padding-bottom: 5%;
            .commentBox{
                #commentInput{
                    width: 100%;
                    height: 50px;
                }
            }
            .btn{
                position: absolute;
                right: 10%;
            }
        }
    }
}
</style>

