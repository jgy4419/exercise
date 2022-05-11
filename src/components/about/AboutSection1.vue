<template>
    <div class="contain">
        <header class="head">
            <div class="backImage"/>
            <div class="headerInner">
                <p class="mainText">
                    오늘 운동 완료했니?
                </p>
            </div>
        </header>
        <section class="section">
            <div class="sectionInner">
                <p class="introductionTitle">페이지 소개</p>
                <hr/>
                <div class="introduction1">
                    저희 <span class="importantText">오운완</span>은 사용자들이 오늘은 어떤 운동을 했는지 기록하고 공유하는 사이트입니다. <br/>
                    처음에 운동하기 어려운 사람들은 회원들이 어떻게 운동을 했는지나 노하우 등을 서로 공유하면서 운동을 쉽게 접근 가능하게 합니다.<br/>
                    
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.contain{
    .head{
        position: relative;
        width: 100vw;
        height: 40vh;
        .backImage{
            position: absolute;
            z-index: 1;
            background-image: url('https://thumb.zumst.com/530x0/https:/static.news.zumst.com/images/132/2021/12/27/546720b89eff47ca8e7f1bc5b28f3ccc.jpg');
            background-size: cover;
            background-repeat: no-repeat;   
            filter: invert(30%);
            width: 100vw;
            height: 100%;
            opacity: 0.9;   
        }
        .headerInner{
            position: relative;
            z-index: 10;
            padding-top: 5%;
            width: 700px;
            margin: auto;
            .mainText{
                font-size: 40px;
                font-weight: 700;
                color: #333;
                text-align: center;
            }
        }
    }
    .section {
        position: relative;
        width: 100vw;
        .sectionInner{
            width: 800px;
            margin: auto;
            .introductionTitle{
                text-align: center;
                font-size: 25px;
                font-weight: 700;
            }
            .introduction1{
                line-height: 2;
                font-weight: 500;
                font-size: 20px;
            }
        }
    }
}
</style>