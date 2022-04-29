<template>
    <div class="contain">
        <div class="inner">
            <form action="/writeBoard" method="POST" enctype="multipart/form-data">
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
            </form>
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
                btnType: ['button', 'submit'],
            },
            category: ['카테고리1', '카테고리2', '카테고리3'],
            
        }
    },
    mounted() {
        const btnClass = document.querySelectorAll('.btn');
        for(let i = 0; i < btnClass.length; i++){
            btnClass[0].addEventListener('click', function(){
                history.go(-1);
                location.href = '/community';
            });
            btnClass[1].addEventListener('click', function(){
                // let title = document.querySelector('.title');
                // let category = document.querySelector('.categoryChoice');
                // // let content = document.querySelector('.note-editable');
                // let content = document.getElementById('summernote');

                // let summernoteContent = $('#summernote').summernote('code'); // 썸머노트 내용
                // write에 적힌 값들
                // let writeData = {

                // };
                // DB한테 게시글 정보 보내고, url /community로 변경하기.
                axios.post('db경로')
                // location.href = '/community';
            })
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
        enterEvent(){
            
        },
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