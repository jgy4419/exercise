<template>
    <div class="contain">
        <div class="detail">
            <div class="postHeader">
                <div class="postImg" :style="{backgroundImage:`url('${post.titleImg}')`}"/>
                <div class="user">
                    <p class="title">{{post.title}}</p>
                    <br/>
                    <div class="information">
                        <p class="id">{{post.userId}}</p>
                        <p class="date">{{post.date}}}</p>
                    </div>
                    <div class="setPost">
                        <p @click="setPost()">수정</p>
                        <p @click="deletePost()">삭제</p>
                    </div>
                </div>
            </div>
        </div>   
        <div class="inner">
            <p id="preview-click"></p>
            <Chart v-if="chartState === 1" class="chart"/>
            <hr>
            <div class="commentList">
                <div class="comments" v-for="data, i in comment.commentDetail.length" :key="i">
                    <div class="commentSetBox">
                        <p @click="commentEdit()">수정</p>
                        <p @click="commentDelete()">삭제</p>
                    </div>
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
import Chart from '../Chart.vue';
export default {
    components: {
        Chart,
    },
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
            // 사용자가 차트 데이터를 올렸는지 안 올렸는지 상태. (일단 임시로 1 적용.)
            chartState: 1, 
        }
    },
    async mounted(){
        // 자신이 올린 게시물만 수정/삭제 가능.
        let userInformation = JSON.parse(localStorage.getItem("userInformation"));
        const setPost = document.querySelector('.setPost');
        if(userInformation.nickname === this.$route.params.id){
            setPost.style.display = 'flex';
        }else if(userInformation.nickname !== this.$route.params.id){
            setPost.style.display = 'none';
        }
        

        function decode(text) {
            // https://codepen.io/csmccoy/pen/yLNBpyW?editors=1010
            return $("<textarea/>").html(text).text();
        }
        // 백엔드에서 직접 게시글 가져오기.
        await axios.get('/api/getPostAll', {params: {board_id: 1, limit: 0}})
        .then(res => {
            for(let i = 0; i < res.data.length; i++){
                if(this.$route.params.id === res.data[i].nickname && this.$route.params.board == res.data[i].board_id && this.$route.params.post == res.data[i].post_id){
                    this.post.title = res.data[i].title;
                    this.post.userId = res.data[i].nickname;
                    $('#preview-click').html(decode(res.data[i].comment));
                    this.post.date = res.data[i].creation_datetime;
                    this.post.titleImg = `http://localhost:3000/img/postPhoto/${res.data[i].photographic_path}`;
                }
            }
        })
        .catch(err => console.log(err));
        await axios.get('/api/showComments', {params: {post_id: this.$route.params.post}})
        .then(res => {
            console.log(res);
            for(let i = 0; i < res.data.length; i++){
                console.log(res.data[i].content);
                this.comment.commentDetail.push(res.data[i].content);
                this.comment.userId.push(res.data[i].nickname);
            }
        }).catch(err => {console.log(err)});
        console.log('~~');
    },
    methods: {
        getComment(){
            console.log("getComment")

        },
        commentUpdate(){
            // 닉네임
            let userInformation = JSON.parse(localStorage.getItem("userInformation"));
            // userInformation.nickname; 유저 닉네임
            console.log('유저 이름', userInformation.nickname);
            console.log('댓글 내용', this.commentInput);

            console.log(this.$route.params.post);
            console.log(userInformation.nickname);
            // this.commentInput 값을 넣어주기. (유저아이디, 게시글 제목)
            // req.body.post_id, req.body.nickname, parent_comments_id, req.ip, req.body.content
            axios.post('/api/comments', {
                post_id: this.$route.params.post,
                nickname: userInformation.nickname,
                content: this.commentInput,
                parent_comments_id: 0,
                // date: commentDate
            })
            .then(res => {
                location.reload();  
                console.log(res);
            })
            .catch(err => console.log(err));
        },
        setPost(){
            location.replace(`/edit/1/${this.$route.params.id}/${this.$route.params.post}/${this.$route.params.board}`);
        },
        deletePost(){
            console.log(this.$route.params.post);
            if(confirm('정말 게시글을 삭제하시겠습니까?')){
                alert('삭제되었습니다!');
                console.log(this.$route.params.post);
                axios.delete('/api/deletePost', {params: {post_id: this.$route.params.post}})
                .catch(err => console.log(err))
                location.replace('/community');
            }
        },
        commentEdit(){
            console.log('댓글 수정');
        },
        commentDelete(){
            console.log('댓글 삭제');
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
            height: 250px;
            
            .postImg{
                position: absolute;
                width: 100%;
                height: 100%;
                filter: brightness(0.5);
                background: rgba(0, 0, 0, .7);
                background-repeat: no-repeat;
                background-size: cover;
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
                .setPost{
                    display: flex;
                    p{
                        color: rgb(216, 216, 216);
                        margin-right: 10px;
                        cursor: pointer;
                    }
                    p:hover{
                        color: #fff;
                    }
                }
            }   
        }
    }
    .inner{
        width: 80vw;
        margin: auto;
        #preview-click{
            padding: 20px;
        }
        .chart{
            position: relative;
            z-index: 100;
        }
        .commentList{
            margin-top: 50px;
            padding: 20px;
            border-radius: 10px;
            width: 80vw;
            min-height: 80px;
            background-color: rgb(243, 243, 243);
            .comments{
                .commentUserId{
                    font-weight: 900;
                }
                .commentTitle{
                    font-weight: 500;
                }
                .commentSetBox{
                    position: absolute;
                    right: 12%;
                    display: flex;
                    p{
                        margin-left: 10px;
                        font-weight: 700;
                        cursor: pointer;
                    }
                }
            }
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
                    padding: 10px;
                }
            }
            .btn{
                position: absolute;
                right: 10%;
            }
        }
    }
    @media screen and (max-width: 700px){
        .detail{
            .postHeader{
                .postImg{
                    // height: 200px;
                }
                .user{
                    .title{
                        font-size: 40px;
                    }
                    .information, .setPost{
                        font-size: 12px;
                    }
                }
            }
        }
    }
    @media screen and (max-width: 400px){
        .detail{
            .postHeader{
                .user{
                    .title{
                        font-size: 30px;
                    }
                    .information, .setPost{
                        font-size: 10px;
                    }
                }
            }
        }
    }
}
</style>

