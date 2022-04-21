<template>
    <div class="contain">
        <div class="inner">
            <div class="set">
                <div class="imgSet">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAIVBMVEXY2Njz8/Pq6urv7+/h4eHb29vo6Oje3t7j4+Pt7e3p6ekmc3lwAAADMElEQVR4nO2bC3KDMAxEMeab+x+4JZQBEkhBlq2NZt8JvGOtPkZUFSGEEEIIIYQQQgghhBBCCCEEnXbo6hjDLzHW3dBan0dEO9ThjfrrxDQHKv60NNZnu0ETz2Q8w+xbpPQfZTyl9NZnvEB7GlS7AIP3SnNFxgR4fHVXdYTQWZ/1A+14XUcII2x4tf+6fE8EVXJXB6qS+zpAldzyx8Jofep3buSrLXC563L9eAWsnrRSHSFg2eRSX3JMbX32Lb1cRwhIHaQg865E69OviJ0+g+P3pAsBupLEC8G5koSUNQOSuBJqyAJGLRnShQzWGp4kRxZKbKXrCMFaw4SCRTBMomARDJMIB5E9CGOJgtcx3J7Yn8wgdCluhGjogMi/FEIhmXBjdjdC3BRENy2Km6bRTRvvZrDyM+q6eXxw8xzk5oHOz5Opm0dsP58V3Hzo8fPpzc3HUD+fp90sDPhZ4fCzVONnzcnN4pmfVUA/y5mVm3XZys8Cs5+V8srNkv+Ek98uJpz8CDPh5NekGRc/ixFCCCHky2mb4TGO8cLkHuM4PoYGsGfph1r0Ih/rAWc2Oexz74DRE59PHre0GE8pvcoiykxnF2O96Ln3nNFGSqMs4ymlfIT9/1Qio/ADS6vojVe6gilMZUXrnFKbKfeeqiWUed5OXti4QgHTZ3THltxv9fnDaiFveOVKukfkTMRJmxr3yaakiM23ZLJ8cR2ZlBjoyKKksD8W1H1ipENdiWQ/QwflrYJidfAd1b2bQn3JMYrdiknCWlFLXSo/VqSgZRNDg8wo2STzPHgFlZnRPLAmNILLNGMtKGQus5K+J73Am5X0PckL9MYlZCW1mJin3oXEFAzikIk0l8BcSOKVAF1I2pVA1JCFlFpiffY9ch0wuXdGnoFVvnPqIf6JCaJd3CJtHQH69z3Sbh4ssuSxZX3ud2Q6oKrhjKwmwllEahI4i0hNAjJSbZGNV9anPkKiA64cTkhKIlijNSNptwCTlixtPawPfcRDIARoyl2RzLtuhACWEVkhcSPE+szHUAgaFIIGhaBBIWhQCBoUggaFoEEhaFAIGhSCBoWgQSFoUAgap8f9Ac1KQOtCVp1TAAAAAElFTkSuQmCC" alt="프로필">
                    <br/>
                    <button v-for="btn in set.imgSet" :key="btn">{{btn}}</button>
                </div>
                <div class="introSet">
                    <p v-for="intro in set.intro" :key="intro">{{intro}}</p>
                    <button class="setBtn">수정</button>
                </div>
            </div>
            <div class="userSecession">
                <span>회원 탈퇴</span>
                <button class="secessionBtn">회원 탈퇴</button>
                <p>회원 탈퇴 시 작성한 글이 모두 삭제되며 다시 복구되지 않습니다.</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            set: {
                imgSet: ['이미지업로드', '이미지 제거'],
                intro: ['이름', '자기소개']
            }
        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.setBtn{
    background-color: transparent;
    border: 0;
    color: #93B5C6;
    text-decoration: underline;
}
.contain {
    // background: linear-gradient(
    //     to bottom right,
    //     #FFDEF2, #E6F0FF
    // );
    width: 100vw;
    height: 900px;
    .inner{
        margin: auto;
        width: 700px;
        .set{
            display: flex;
            
        }
        .secessionBtn{
            font-size: 14px;
            font-weight: 700;
            border-radius: 10px;
            border: 0;
            background-color: rgb(252, 224, 224);
            width: 100px;
            height: 40px;
        }
    }
}
</style>