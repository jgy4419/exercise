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
                <img class="writeImage" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAIVBMVEXY2Njz8/Pq6urv7+/h4eHb29vo6Oje3t7j4+Pt7e3p6ekmc3lwAAADMElEQVR4nO2bC3KDMAxEMeab+x+4JZQBEkhBlq2NZt8JvGOtPkZUFSGEEEIIIYQQQgghhBBCCCEEnXbo6hjDLzHW3dBan0dEO9ThjfrrxDQHKv60NNZnu0ETz2Q8w+xbpPQfZTyl9NZnvEB7GlS7AIP3SnNFxgR4fHVXdYTQWZ/1A+14XUcII2x4tf+6fE8EVXJXB6qS+zpAldzyx8Jofep3buSrLXC563L9eAWsnrRSHSFg2eRSX3JMbX32Lb1cRwhIHaQg865E69OviJ0+g+P3pAsBupLEC8G5koSUNQOSuBJqyAJGLRnShQzWGp4kRxZKbKXrCMFaw4SCRTBMomARDJMIB5E9CGOJgtcx3J7Yn8wgdCluhGjogMi/FEIhmXBjdjdC3BRENy2Km6bRTRvvZrDyM+q6eXxw8xzk5oHOz5Opm0dsP58V3Hzo8fPpzc3HUD+fp90sDPhZ4fCzVONnzcnN4pmfVUA/y5mVm3XZys8Cs5+V8srNkv+Ek98uJpz8CDPh5NekGRc/ixFCCCHky2mb4TGO8cLkHuM4PoYGsGfph1r0Ih/rAWc2Oexz74DRE59PHre0GE8pvcoiykxnF2O96Ln3nNFGSqMs4ymlfIT9/1Qio/ADS6vojVe6gilMZUXrnFKbKfeeqiWUed5OXti4QgHTZ3THltxv9fnDaiFveOVKukfkTMRJmxr3yaakiM23ZLJ8cR2ZlBjoyKKksD8W1H1ipENdiWQ/QwflrYJidfAd1b2bQn3JMYrdiknCWlFLXSo/VqSgZRNDg8wo2STzPHgFlZnRPLAmNILLNGMtKGQus5K+J73Am5X0PckL9MYlZCW1mJin3oXEFAzikIk0l8BcSOKVAF1I2pVA1JCFlFpiffY9ch0wuXdGnoFVvnPqIf6JCaJd3CJtHQH69z3Sbh4ssuSxZX3ud2Q6oKrhjKwmwllEahI4i0hNAjJSbZGNV9anPkKiA64cTkhKIlijNSNptwCTlixtPawPfcRDIARoyl2RzLtuhACWEVkhcSPE+szHUAgaFIIGhaBBIWhQCBoUggaFoEEhaFAIGhSCBoWgQSFoUAgap8f9Ac1KQOtCVp1TAAAAAElFTkSuQmCC" alt="프로필">
                <label class="photographic_path" for="photographic_path">대표 이미지를 선택해주세요.</label><input class="hidden" id="photographic_path" type="file"/>
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
        // 어떤 유저가 들어왔는지 확인.
        console.log('inUser', this.$store.state.User.storeMail);
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
                // let nickName = '닉네임';
                // 글 제목
                let title = document.querySelector('.title');
                let category = document.querySelector('.categoryChoice');
                let photographic_path = document.querySelector('.writeImage').src;
                // let content = document.querySelector('.note-editable');
                let content = document.getElementById('summernote');

                let summernoteContent = $('#summernote').summernote('code'); // 썸머노트 내용
                // write에 적힌 값들
                let writeData = {
                   writeUser, title, category, content, summernoteContent, photographic_path
                };
                console.log(writeData);
                axios.post('/api/createPost', {writeData: writeData});
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
            if(input.files && input.files[0]){
                const reader = new FileReader();
                reader.onload = e => {
                    const changeImage = document.querySelector('.writeImage');
                    changeImage.src = e.target.result;
                    this.changeImg = e.target.result;
                    // console.log(this.changeImg);
                }
                reader.readAsDataURL(input.files[0]);
            }
        },
        deleteImg(){
            const changeImage = document.querySelector('.changeImage');
            changeImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAIVBMVEXY2Njz8/Pq6urv7+/h4eHb29vo6Oje3t7j4+Pt7e3p6ekmc3lwAAADMElEQVR4nO2bC3KDMAxEMeab+x+4JZQBEkhBlq2NZt8JvGOtPkZUFSGEEEIIIYQQQgghhBBCCCEEnXbo6hjDLzHW3dBan0dEO9ThjfrrxDQHKv60NNZnu0ETz2Q8w+xbpPQfZTyl9NZnvEB7GlS7AIP3SnNFxgR4fHVXdYTQWZ/1A+14XUcII2x4tf+6fE8EVXJXB6qS+zpAldzyx8Jofep3buSrLXC563L9eAWsnrRSHSFg2eRSX3JMbX32Lb1cRwhIHaQg865E69OviJ0+g+P3pAsBupLEC8G5koSUNQOSuBJqyAJGLRnShQzWGp4kRxZKbKXrCMFaw4SCRTBMomARDJMIB5E9CGOJgtcx3J7Yn8wgdCluhGjogMi/FEIhmXBjdjdC3BRENy2Km6bRTRvvZrDyM+q6eXxw8xzk5oHOz5Opm0dsP58V3Hzo8fPpzc3HUD+fp90sDPhZ4fCzVONnzcnN4pmfVUA/y5mVm3XZys8Cs5+V8srNkv+Ek98uJpz8CDPh5NekGRc/ixFCCCHky2mb4TGO8cLkHuM4PoYGsGfph1r0Ih/rAWc2Oexz74DRE59PHre0GE8pvcoiykxnF2O96Ln3nNFGSqMs4ymlfIT9/1Qio/ADS6vojVe6gilMZUXrnFKbKfeeqiWUed5OXti4QgHTZ3THltxv9fnDaiFveOVKukfkTMRJmxr3yaakiM23ZLJ8cR2ZlBjoyKKksD8W1H1ipENdiWQ/QwflrYJidfAd1b2bQn3JMYrdiknCWlFLXSo/VqSgZRNDg8wo2STzPHgFlZnRPLAmNILLNGMtKGQus5K+J73Am5X0PckL9MYlZCW1mJin3oXEFAzikIk0l8BcSOKVAF1I2pVA1JCFlFpiffY9ch0wuXdGnoFVvnPqIf6JCaJd3CJtHQH69z3Sbh4ssuSxZX3ud2Q6oKrhjKwmwllEahI4i0hNAjJSbZGNV9anPkKiA64cTkhKIlijNSNptwCTlixtPawPfcRDIARoyl2RzLtuhACWEVkhcSPE+szHUAgaFIIGhaBBIWhQCBoUggaFoEEhaFAIGhSCBoWgQSFoUAgap8f9Ac1KQOtCVp1TAAAAAElFTkSuQmCC';
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
            width: 10vw;
            // height: 50px;
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