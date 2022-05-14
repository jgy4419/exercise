<template>
    <div class="contain">
        <div class="inner">
            <!-- <form action="/writeBoard" method="POST" enctype="multipart/form-data"> -->
                <div class="writeHeader">
                    <input type="text" class="title" placeholder="제목을 입력하세요">
                    <hr/>
                    <div class="category">
                        <label class="categoryText" for="">카테고리를 선택하세요</label>
                        <select name="categoryChoice" class="categoryChoice">
                            <option v-for="category in category" :key="category"
                             value="카테고리1">{{category}}</option>
                        </select>
                    </div>
                </div>
                <img class="writeImage" src="https://mblogthumb-phinf.pstatic.net/MjAxNzEyMThfMjQ1/MDAxNTEzNjA3MTcwNTg4.f9D3x971p8iDr_ox3nOQZmp2bHHA3YEtAvWI6-Zq6aAg.1E7HSp02TKDPZwC1wdciQdKiMEEzo0TvuY0ts5OmK4Mg.PNG.ooza-/IMG_9198.PNG?type=w800" style="display:none" alt="프로필">
                <label class="photographic_path" for="photographic_path">대표 이미지를 선택해주세요.</label><input class="hidden" id="photographic_path" type="file"/>
                <button class="photographic_path" @click="deleteImg()">배경사진 초기화</button>
                <hr class="line">
                <div class="editor-page">
                    <div id="summernote">오늘 한 운동에 대해서 말씀해주세요!</div>
                </div>
                <div class="btnBox">
                    <button class="btn" v-for="btns, i in btn.btnName" :key="i" :type="btn.btnType">
                        <i :class="btn.class[i]" ></i>
                        {{btns}}
                    </button>
                </div>
            <!-- </form> -->
        </div>
    </div>
</template>

<script>
import axios from 'axios';
// import {uploadImg} from '../../../repeatFunc/loadImage';
export default {
    data(){
        return{
            btn: {
                class: ['fa fa-arrow-left', 'submit'],
                btnName: ['', '올리기'],
                btnType: ['button', 'button'],
            },
            category: ['카테고리1', '카테고리2', '카테고리3'],
            changeImg: '',
        }
    },
    mounted() {
        let userInformation = JSON.parse(localStorage.getItem("userInformation"));
        // 어떤 유저가 들어왔는지 확인.
        // console.log('inUser', this.$store.state.User.storeMail);
        // console.log('들어온 닉네임', userInformation.nickname);
        // 글 적은 user
        let writeUser = this.$store.state.User.storeMail;
        console.log(writeUser);

        const btnClass = document.querySelectorAll('.btn');
        for(let i = 0; i < btnClass.length; i++){
            btnClass[0].addEventListener('click', function(){
                history.go(-1);
                location.href = '/community';
            });
            btnClass[1].addEventListener('click', function(){
                // let board_id = this.$store.state.User.storeMail; // user id
                let nickName = userInformation.nickname;
                // 글 제목
                let title = document.querySelector('.title');
                // let category = document.querySelector('.categoryChoice');
                let photographic_path = document.querySelector('.writeImage').src;
                // let content = document.querySelector('.note-editable');
                // let content = document.getElementById('summernote');

                let summernoteContent = $('#summernote').summernote('code'); // 썸머노트 내용
                console.log(summernoteContent);

                let frm = new FormData();
                // form.append({
                //     'nickname': nickName,
                //     'title': title,
                //     'photographic_path': photographic_path,
                //     'content': summernoteContent
                // });
                frm.append('board_id', Number(1));
                frm.append('nickname', nickName);
                frm.append('title', title);
                frm.append('photographic_path', photographic_path);
                frm.append('content', summernoteContent);

                console.log(frm);
                axios.post('/api/createPost', frm,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => console.log(res))
                .catch(err => console.log(err))
                // location.href = '/community';
            });
        }
        $('#summernote').summernote({
            height: 450,
            minHeight: null,
            maxHeight: null,
            focus: true,
            toolbar: [
                ['style', ['bold', 'italic', 'underline']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['paragraph']],
                ['height', ['height']],
                ['Insert', ['picture']],
                ['Mics',['codeview']]
            ]
        });

        const backImg = document.getElementById('photographic_path');
        backImg.addEventListener('change', e => {
            this.uploadImg(e.target);
        })
    },
    methods:{
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
                    this.changeImg = e.target.result;
                    // console.log(this.changeImg);
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
        .photographic_path{
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