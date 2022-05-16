<template>
    <div class="contain">
        <div class="detail">
            <div class="postHeader">
                <img class="postImg" :src="post.titleImg"/>
                <div class="user">
                    <p class="title">{{post.title}}</p>
                    <br/>
                    <div class="information">
                        <p class="id">{{post.userId}}</p>
                        <p class="date">{{post.date}}}</p>
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
                board_id: 0,
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
        // 백엔드에서 직접 게시글 가져오기.
        axios.get('/api/getPost', {params: {board_id: 1, limit: 0}})
        .then(res => {
            console.log(res)
            for(let i = 0; i < res.data.length; i++){
                if(this.$route.params.id === res.data[i].nickname && this.$route.params.board == res.data[i].board_id && this.$route.params.post == res.data[i].post_id){
                    this.post.title = res.data[i].title;
                    this.post.userId = res.data[i].nickname;
                    this.post.postDetail = res.data[i].comment;
                    this.post.date = res.data[i].creation_datetime;
                    this.post.titleImg = `http://localhost:3000/img/postPhoto/${res.data[i].photographic_path}`;
                }
            }
        })
        .catch(err => console.log(err));
        // axios.get('/api/getPost', {params: {board_id: 1, limit: 0}})
        // .then(res => {
        //     console.log(res);
        //     console.log(this.$route.params);
        //     // if(this.$route.params.id === res.data[i].user_id && this.$route.params.post == res.data[i].board_id){
        //     //     this.post.title = res.data[i].title;
        //     //     this.post.userId = res.data[i].nickname;
        //     //     this.post.postDetail = res.data[i].content;
        //     //     this.post.titleImg = res.data[i].photographic_path;
        //     // }
        // }).catch(err => console.log(err))

        // test 데이터
        // axios.get('http://localhost:8800/all')
        // .then(res => {
        //     console.log(res.data);
        //     for(let i = 0; i < res.data.length; i++){
        //         if(this.$route.params.id === res.data[i].id && this.$route.params.post == res.data[i].board_id){
        //             this.post.board_id = res.data[i].board_id;
        //             this.post.title = res.data[i].title;
        //             this.post.userId = res.data[i].id;
        //             this.post.postDetail = res.data[i].postWrite;
        //             this.post.titleImg = res.data[i].titleImg;
        //         }
        //     }
        // })
        // .catch(err => {console.log(err)})

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

            let commentDate = `${year}년 ${month}월 ${date}일 ${day} ${hours}시 ${minutes}분 ${seconds}초`;
            console.log(commentDate);

            // 닉네임
            let userInformation = JSON.parse(localStorage.getItem("userInformation"));
            // userInformation.nickname; 유저 닉네임
            console.log('유저 이름', userInformation.nickname);
            console.log('댓글 내용', this.commentInput);

            // this.commentInput 값을 넣어주기. (유저아이디, 게시글 제목)
            // req.body.post_id, req.body.nickname, parent_comments_id, req.ip, req.body.content
            axios.post('/api/comments', {
                // post_id: post_id,
                nickname: userInformation.nickname,
                content: this.commentInput,
                date: commentDate
            })
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
            height: 500px;
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

