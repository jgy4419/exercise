<template>
    <div class="contain">
        <div class="inner">
            <div class="writeHeader">
                <input v-model="postDetail.title" type="text" class="title" placeholder="제목을 입력하세요">
                <hr/>
                <div class="category">
                    <label class="categoryText" for="">카테고리를 선택하세요</label>
                    <select name="categoryChoice" class="categoryChoice" @change="categoryChange($event)">
                        <option class="categoryOptions" v-for="category in $store.state.Community.categorys" :key="category"
                            :value="category">{{category}}</option>
                    </select>
                </div>
            </div>
            <img class="writeImage" style="display:none" src='https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTc5/MDAxNTIwMDQxNzQwODYx.qQDg_PbRHclce0n3s-2DRePFQggeU6_0bEnxV8OY1yQg.4EZpKfKEOyW_PXOVvy7wloTrIUzb71HP8N2y-YFsBJcg.PNG.osy2201/1_%2835%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800' alt="프로필">
            <label class="photographic_path" for="photographic_path">대표 이미지를 선택해주세요.</label><input class="hidden" id="photographic_path" type="file"/>
            <button class="photographic_path" @click="deleteImg()">배경사진 초기화</button>
            <label class="sensor_btn" v-if="postDetail.postCount === 3" for="sensor_btn">센서 데이터 추가</label><input class="hidden" id="sensor_btn" type="file"/>
            <hr class="line">
            <div class="editor-page">
                <div :v-model="postDetail.writing" id="summernote">오늘 운동한 내용을 말해주세요~!</div>
            </div>
            <div class="btnBox">
                <button :class="btn.class[i]" v-for="btns, i in btn.btnName" :key="i">
                    <i :class="btn.iClass[i]" ></i>
                    {{btns}}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import DOMPurify from 'dompurify';
export default {
    data(){
        return{
            btn: {
                class: ['btn back', 'btn submit'],
                iClass: ['fa fa-arrow-left', 'button'],
                btnName: ['', '올리기'],
                btnType: ['button', 'button'],
            },
            // category: ['카테고리1', '카테고리2', '카테고리3'],
            changeImg: '',
            postDetail: {
                title: '',
                writing: '',
                postCount: 1,
            }
        }
    },
    async mounted() {

        // 라우트 변수들
        let route = {
            nickname: this.$route.params.id,
            post_id: this.$route.params.post,
            board_id: this.$route.params.board
        };
        let writeState = this.$route.params.edit;
        console.log(this.$route.params);
        // 만약 url에서 edit 설정 부분이 1이면 
        if(writeState == 1){
            let writing = document.getElementById('summernote');
            let title = document.querySelector('.title');
            this.btn.btnName[1] = '수정하기';
            // url의 id, post, board 부분의 동일한 값을 DB에서 가져와서 넣어줌.
            axios.get('/api/getPostAll', {params: {
                // nickname: this.$route.params.id,
                // post_id: this.$route.params.post,
                limit: 0,
                board_id: this.$route.params.board,
            }}).then(res => {
                for(let i = 0; i < res.data.length; i++){
                    if(this.$route.params.post == res.data[i].post_id){
                        console.log(res.data[i]);
                        writing.innerHTML = res.data[i].comment;
                        title.value = res.data[i].title;
                        console.log(writing);
                    }
                }
            }).catch(err => console.log(err));
        }
        // setTimeout 안쓰고 구현 해보기.
        setTimeout(() => {
            $(document).ready(function summernoteSandbox() {
                var $editor = $('#summernote');
                
                $editor.summernote({
                    disableResizeEditor: false,
                    codeviewFilter: true,
                    codeviewIframeFilter: true,
                    height: 200,
                    maximumImageFileSize: 1048576,
                    callbacks:{
                        onImageUploadError: function uploadImageError(msg){
                        alert(msg);
                        }
                    },
                    toolbar: [
                    ['operation', ['undo', 'redo']],
                    ['style', ['bold', 'italic', 'underline']],
                    ['color', ['color']],       
                    ['font', ['strikethrough', 'superscript', 'subscript', 'clear']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['insert', ['link','picture', 'hr']],
                    ['view', ['codeview']],
                    ]
                });
            });
        }, 300)

        let userInformation = JSON.parse(localStorage.getItem("userInformation"));
        // 어떤 유저가 들어왔는지 확인.
        let writeUser = this.$store.state.User.storeMail;
        console.log(writeUser);
        document.querySelector('.back').addEventListener('click', function(){
            history.go(-1);
            location.href = '/community';
        });

        // board = this.postDetail.postCount;
        document.querySelector('.submit').addEventListener('click', function(){
            let board = 1; // 기본 카테고리 번호 (전체 게시물)
            let categoryChoice = document.querySelector('.categoryChoice');

            if(categoryChoice.value === '자유게시판') board = 2;
            else if(categoryChoice.value === '운동게시판') board = 3;
            else board = 1;

            var enteredText, decoded, sanitized = null;
            let nickName = userInformation.nickname;
            // 글 제목
            let title = document.querySelector('.title');
            let photographic_path = document.getElementById('photographic_path');
            console.log(photographic_path.files[0]);

            // let summernoteContent = $('#summernote').summernote('code'); // 썸머노트 내용
            function decode(text) {
                // https://codepen.io/csmccoy/pen/yLNBpyW?editors=1010
                return $("<textarea/>").html(text).text();
            }
            
            function encode(text) {
                var textArea = document.createElement('textarea');
                textArea.innerText = text;
                return textArea.innerHTML;
            }
            
            function resetVars(){
                enteredText = null;
                decoded = null;
                sanitized = null;
            }
            function getSanitizedText(){
                resetVars();
                enteredText = $('#summernote').summernote('code');
                decoded = decode(enteredText);
                sanitized = DOMPurify.sanitize(decoded);
                return encode(sanitized);
            }
            let frm = new FormData();
            var userEntry = getSanitizedText();
            let comment = '';

            comment = decode(userEntry);
            frm.append('title', title.value);
            frm.append('photographic_path', photographic_path.files[0]);
            frm.append('availabilty_comments', 1);
            frm.append('board_id', board);
            if(writeState == 1){ // writeState가 1일 때 수정
                console.log(photographic_path.files[0]);
                // frm.append('nickname', route.nickname);
                frm.append('post_id', parseInt(route.post_id));
                frm.append('comment', comment);
                // frm.append('board_id', this.$route.params.board);
                axios.patch('/api/updatePost', frm, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    console.log(res);
                    location.href = '/community';
                }).catch(err => {
                    console.log(err);
                })
            }else if(writeState == 0){
                console.log('0번째 글');
                frm.append('nickname', nickName);
                frm.append('content', comment);
                axios.post('/api/createPost', frm, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                }).then(res => {
                    console.log(res);
                    location.href = '/community';
                })
                .catch(err => console.log(err))
            }
        });

        const backImg = document.getElementById('photographic_path');
        backImg.addEventListener('change', e => {
            this.uploadImg(e.target);
        })
    },
    methods:{
        categoryChange(val){
            console.log(val.target.value);
            if(val.target.value === '운동게시판'){
                this.postDetail.postCount = 3;
            }else{
                this.postDetail.postCount = 1;
            }
        },
        // input에 style을 enter 누르면 원래대로 되돌리기..
        // text 두께
        thickness(){
            let content = document.getElementById('content');
            // content.classList.toggle('thickness');
            let addSpan = document.createElement('span');
            addSpan.setAttribute('class', 'size');
            addSpan.innerHTML('안녕');
            content.appendChild(addSpan);
        },
        uploadImg(input){
            // 내일 시간날 때 수정시켜주기.
            // const changeImage = document.querySelector('.writeImage');
            // uploadImg(input, changeImage, this.changeImg);

            if(input.files && input.files[0]){
                const reader = new FileReader();
                reader.onload = e => {
                    const changeImage = document.querySelector('.writeImage');
                    changeImage.style.display = "block";
                    changeImage.src = e.target.result;
                    console.log(changeImage.files[0]);
                    this.changeImg = changeImage.files[0];
                    console.log(this.changeImg);
                }
                reader.readAsDataURL(input.files[0]);
            }
        },
        deleteImg(){
            const changeImage = document.querySelector('.writeImage');
            changeImage.src = '';
            changeImage.style.display = "none";
        }
    }
}
</script>

<style lang="scss" scoped>
input, textarea{
    outline-style: none;
}
.contain{
    .inner{
        width: 70%;
        margin: 2% auto;
        .writeHeader{
            display: flex;
        }
        .writeImage{
            width: 300px;
            aspect-ratio: 16 / 9;
        }
        .title, #content{
            width: 70%;
            box-sizing: border-box;
            padding: 10px;
            border: 0;
        }
        .title{
            height: 50px;
            font-size: 20px;
            font-weight: 700;
            border: 0;
        }
        .photographic_path, .sensor_btn{
            margin-top: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgb(234, 233, 233);
            border: 0;
            font-weight: 700;
            border-radius: 10px;
            height: 40px;
            width: 200px;
            cursor: pointer;
        }
        .category{
            position: relative;
            top: 10px;
            width: 350px;
            display: flex;
            justify-content: space-between;
            .categoryText{
                margin-top: 12px;
                font-size: 14px;
                width: 130px;
            }
            .categoryChoice{
                width: 200px;
                height: 50px;
                border-radius: 10px;
                font-size: 14px;
                font-weight: 700;
            }
        }
        .toolBox{
            margin-top: 30px;
            display: flex;
            .textTool{
                text-align: center;
                width: 30px;
                height: 20px;
                padding-top: 5px;
                background-color: transparent;
                font-size: 13px;
                color: rgb(80, 80, 80);
                border: 2px solid rgb(206, 206, 206);
                border-radius: 5px;
                margin-left: 10px;
                font-weight: 700;
                cursor: pointer;
            }
        }
        #content{
            margin-top: 2%;
            font-size: 15px;
        }
        #content.thickness{
            content: "aa";
            font-size: 30px !important; 
            color: green;
        }
        .line{
            width: 20%;
            margin-left: 0%;
            border: 3px solid rgb(193, 193, 193);
        }
        .editor-page{
            #summernote{
                height: 500px;
            }
        }
        .btnBox{
            position: fixed;
            box-shadow: 0px 2px 2px 1px rgb(222, 222, 222) inset;
            padding: 10px;
            box-sizing: border-box;
            width: 70%;
            height: 8%;
            bottom: 0;
            z-index: 10;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .btn{
                background-color: #C9CCD5;
                font-weight: 700;
                cursor: pointer;
                color: #fff;
                width: 120px;
                height: 40px;
                font-size: 18px;
                border: 0;
                border-radius: 5px;
                transition: .3s;
            }
            .btn:hover{
                background-color: #fff;
                color: #333;
                border: 0;
            }
        }
    }
}
@media screen and (max-width: 900px){
    .contain{
        .inner{
            .writeHeader{
                padding-top: 10px;
                display: block;
                .category{
                    margin-bottom: 30px;
                    .categoryText{
                        display: none;
                    }
                    .categoryChoice{
                        width: 100%;
                        font-size: 12px;
                    }
                }
                .title{
                    font-size: 18px;
                }
            }
            .editor-page{
                font-size: 12px;
            }
        }
    }
}
</style>