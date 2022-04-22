<template>
    <div class="contain">
        <div class="inner">
            <div class="set">
                <div class="imgSet">
                    <img class="changeImage" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAIVBMVEXY2Njz8/Pq6urv7+/h4eHb29vo6Oje3t7j4+Pt7e3p6ekmc3lwAAADMElEQVR4nO2bC3KDMAxEMeab+x+4JZQBEkhBlq2NZt8JvGOtPkZUFSGEEEIIIYQQQgghhBBCCCEEnXbo6hjDLzHW3dBan0dEO9ThjfrrxDQHKv60NNZnu0ETz2Q8w+xbpPQfZTyl9NZnvEB7GlS7AIP3SnNFxgR4fHVXdYTQWZ/1A+14XUcII2x4tf+6fE8EVXJXB6qS+zpAldzyx8Jofep3buSrLXC563L9eAWsnrRSHSFg2eRSX3JMbX32Lb1cRwhIHaQg865E69OviJ0+g+P3pAsBupLEC8G5koSUNQOSuBJqyAJGLRnShQzWGp4kRxZKbKXrCMFaw4SCRTBMomARDJMIB5E9CGOJgtcx3J7Yn8wgdCluhGjogMi/FEIhmXBjdjdC3BRENy2Km6bRTRvvZrDyM+q6eXxw8xzk5oHOz5Opm0dsP58V3Hzo8fPpzc3HUD+fp90sDPhZ4fCzVONnzcnN4pmfVUA/y5mVm3XZys8Cs5+V8srNkv+Ek98uJpz8CDPh5NekGRc/ixFCCCHky2mb4TGO8cLkHuM4PoYGsGfph1r0Ih/rAWc2Oexz74DRE59PHre0GE8pvcoiykxnF2O96Ln3nNFGSqMs4ymlfIT9/1Qio/ADS6vojVe6gilMZUXrnFKbKfeeqiWUed5OXti4QgHTZ3THltxv9fnDaiFveOVKukfkTMRJmxr3yaakiM23ZLJ8cR2ZlBjoyKKksD8W1H1ipENdiWQ/QwflrYJidfAd1b2bQn3JMYrdiknCWlFLXSo/VqSgZRNDg8wo2STzPHgFlZnRPLAmNILLNGMtKGQus5K+J73Am5X0PckL9MYlZCW1mJin3oXEFAzikIk0l8BcSOKVAF1I2pVA1JCFlFpiffY9ch0wuXdGnoFVvnPqIf6JCaJd3CJtHQH69z3Sbh4ssuSxZX3ud2Q6oKrhjKwmwllEahI4i0hNAjJSbZGNV9anPkKiA64cTkhKIlijNSNptwCTlixtPawPfcRDIARoyl2RzLtuhACWEVkhcSPE+szHUAgaFIIGhaBBIWhQCBoUggaFoEEhaFAIGhSCBoWgQSFoUAgap8f9Ac1KQOtCVp1TAAAAAElFTkSuQmCC" alt="프로필">
                    <br/>
                    <input type="file" id="changeImg" class="hidden"/>
                    <label class="changeImg" for="changeImg">이미지 업로드</label>
                    <button @click="deleteImg()" class="imgDeleteBtn">이미지제거</button>
                </div>
                <div class="rightLine"/>
                <div class="introSet">
                    <p v-for="intro in set.intro" :key="intro"><span class = "beforeText">{{intro}}</span></p>
                    <input v-model="changeData.intro[i]" class = "afterText" v-for="intro, i in set.intro" :key="i" type="text"><br/>
                    <button @click="setInput()" class="setBtn">수정</button>
                </div>
            </div>
            <hr/>
            <div class="userSecession">
                <span>회원 탈퇴</span>
                <button class="secessionBtn" @click="userDelete()">회원 탈퇴</button>
                <p>회원 탈퇴 시 작성한 글이 모두 삭제되며 다시 복구되지 않습니다.</p>
            </div>
            <hr/>
            <div>
                <button class="btn" @click="save()">저장하기</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            set: {
                imgSet: [ '이미지 제거'],
                intro: ['이름', '자기소개'],
            },
            changeData: {
                intro: ['이름', '자기소개'],
            },
            changeImg: '',
        }
    },
    mounted(){
        // 회원 정보를 불러오기.
        axios.get('http://localhost:8800/user')
        .then(res => {
            console.log(res.data[0]);
            let getData = res.data[0];
            this.set.intro[0] = getData.name;
            this.set.intro[1] = getData.introduction;
            this.changeData.intro[0] = getData.name;
            this.changeData.intro[1] = getData.introduction;
        })
        .catch(err => {console.log(err)});

        // input의 img가 변경되면(파일을 업로드 하면) 이미지가 파일에 맞는 이미지로 변경됨.
        const changeImg = document.getElementById('changeImg');
        changeImg.addEventListener('change', e => {
            this.uploadImg(e.target);
        })
    },
    methods: {
        uploadImg(input){
            if(input.files && input.files[0]){
                const reader = new FileReader();
                reader.onload = e => {
                    const changeImage = document.querySelector('.changeImage');
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
        },
        save(){
            // 저장된 내용들을 수정시켜준다.
            /*
                this.set.intro[0]은 변경된 유저 이름.
                this.set.intro[1]은 변경된 유저의 자기소개.
                this.changeImg은 변경된 이미지.
            */
            axios.patch('')
        },
        userDelete(){
             if (confirm("정말로 회원을 탈퇴하시겠습니까?")) {
                // 확인 버튼 클릭 시 동작
                alert("탈퇴되었습니다.");
                axios.delete('')
            } else {
                // 취소 버튼 클릭 시 동작
                alert("탈퇴하기를 취소하였습니다.");
            }
        },
        setInput(){
            const beforeText = document.querySelectorAll('.beforeText');
            const afterText = document.querySelectorAll('.afterText');
            // 버튼을 누르면 변경경 text 값 적용 시켜줌.
            for(let i = 0; i < beforeText.length; i++){
                beforeText[i].classList.toggle('event');
                afterText[i].classList.toggle('event');
                this.set.intro[i] = this.changeData.intro[i];
            }
        }
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
    // height: 900px;
    .inner{
        margin: auto;
        width: 700px;
        margin-top: 10%;
        .set{
            display: flex;
            .imgSet{
                img{
                    width: 150px;
                    height: 150px;
                    border-radius: 10px;
                }
                .imgDeleteBtn, .changeImg{
                    display: flex;
                    margin-top: 10px;
                    justify-content: center;
                    align-items: center;
                    border: 0px;
                    border-radius: 10px;
                    background-color: #93B5C6;
                    text-align: center;
                    color: #fff;
                    font-size: 14px;
                    font-weight: 700;
                    width: 150px;
                    height: 40px;
                    cursor: pointer;
                }
                .imgDeleteBtn:hover, .changeImg:hover {
                    background-color: #C9CCD5;
                }
            }
            .rightLine{
                margin-left: 50px;
                width: 1px;
                height: 250px;
                background: rgb(151, 151, 151);
            }
            .introSet{
                margin-left: 100px;
                .beforeText{
                    font-size: 25px;
                    font-weight: 700;
                    color: #333;
                }
                .beforeText:nth-child(2) {
                    font-size: 20px;
                    color: rgb(151, 151, 151);
                }
                .beforeText.event{
                    display: none;
                }
                .afterText{
                    display: none;
                    background-color: rgb(240, 240, 240);
                    border: 1px solid rgb(202, 202, 202);
                    border-radius: 10px;
                    font-size: 18px;
                    font-weight: 500;
                    width: 300px;
                    height: 40px;
                    padding: 10px;
                    margin-top: 10px;
                }
                .afterText.event{
                    display: block;
                }
            }
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
        .userSecession{
            width: 100%;
            height: 80px;
            // background-color: #333;
            margin-top: 30px;
            span{
                font-weight: 700;
                font-size: 18px;
            }
            .secessionBtn{
                margin-left: 10%;
            }
            p{
                padding-top: 20px;
                font-size: 12px;
                color: rgb(215, 215, 215);
            }
        }
    }
}
</style>