<template>
    <div class="container">
        <div class="inner">
            <form action="/writeBoard" method="POST">
                <div>
                    <input type="text" class="title" placeholder="제목을 입력하세요">
                </div>
                <hr class="line">
                <div class="toolBox">
                    <button class="textTool" v-for="tool in textTool" :key="tool">{{tool}}</button>
                </div>
                <div>
                    <textarea name="content" placeholder="글 내용을 입력하세요." id="content" cols="50" rows="20"></textarea>
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
            textTool: ['B', 'I', '사진', '링크', '"']
        }
    }
}
</script>

<style lang="scss" scoped>
input, textarea{
    outline-style: none;
}
.container{
    .inner{
        width: 70%;
        margin: 5% auto;
        .title, #content{
            width: 100%;
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
        .toolBox{
            margin-top: 30px;
            .textTool{
                width: 40px;
                height: 30px;
                background-color: transparent;
                color: rgb(80, 80, 80);
                border: 2px solid rgb(206, 206, 206);
                border-radius: 5px;
                margin-left: 10px;
                font-weight: 700;
            }
        }
        #content{
            margin-top: 2%;
            font-size: 15px;
        }
        .line{
            width: 20%;
            margin-left: 0%;
            border: 3px solid rgb(193, 193, 193);
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