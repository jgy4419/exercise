<template>
    <div class="contain">
        <div class="inner">
            <form action="/writeBoard" method="POST" enctype="multipart/form-data">
                <div class="writeHeader">
                    <input type="text" class="title" placeholder="제목을 입력하세요">
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
                    <div id="summernote" style="height=300px;"></div>
                </div>
                <div class="btnBox">
                    <button class="btn" v-for="btns, i in btn.btnName" :key="i" :type="btn.btnType">{{btns}}</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            btn: {
                btnName: ['<= 나가기', '올리기'],
                btnType: ['', 'submit'],
            },
            category: ['카테고리1', '카테고리2', '카테고리3'],
        }
    },
    mounted() {
        // 스크린 전체 크기 구하기.
        let screenHeight = screen.height;
        console.log(screenHeight);

        $('#summernote').summernote({
        height: screenHeight / 2,
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
                height: 300px;
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
</style>