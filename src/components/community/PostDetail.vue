<template>
    <div class="container">
        <div class="detail">
            <div class="postImg">
                <div class="user">
                    <p class="title">게시글 제목</p>
                    <br/>
                    <div class="information">
                        <p class="id">UserID</p>
                        <p class="date">게시물 올린 날짜</p>
                    </div>
                </div>
            </div>
        </div>   
        <div class="inner">
            <p>글 내용</p>
        </div>
    </div> 
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.container{
    .detail{
        position: relative;
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
        // border: 1px solid #333;
    }
}
</style>

