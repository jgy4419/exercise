<template>
    <div>
        <div class="container">
            <div class="inner">
                <!-- <form action="/join" method="post" class="login">  -->
                    <p>회원가입</p>
                    <div v-for="value, i in value" :key="i">
                        <label for="input" class="labelName">{{label[i]}}</label>
                        <input class="input" :type = type[i] :placeholder = value>
                    </div>
                    <div class="sex">
                        <label class="a">성별을 선택해주세요.</label>
                        <select name="sexChoice">
                            <option value="남">남</option>
                            <option value="여">여</option>
                        </select>
                    </div>
                    <div class="fileBox">
                        <label>프로필 사진을 넣어주새요</label>
                        <input class="file" type="file">
                    </div>
                    <img class="priview" alt="이미지" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAIVBMVEXY2Njz8/Pq6urv7+/h4eHb29vo6Oje3t7j4+Pt7e3p6ekmc3lwAAADMElEQVR4nO2bC3KDMAxEMeab+x+4JZQBEkhBlq2NZt8JvGOtPkZUFSGEEEIIIYQQQgghhBBCCCEEnXbo6hjDLzHW3dBan0dEO9ThjfrrxDQHKv60NNZnu0ETz2Q8w+xbpPQfZTyl9NZnvEB7GlS7AIP3SnNFxgR4fHVXdYTQWZ/1A+14XUcII2x4tf+6fE8EVXJXB6qS+zpAldzyx8Jofep3buSrLXC563L9eAWsnrRSHSFg2eRSX3JMbX32Lb1cRwhIHaQg865E69OviJ0+g+P3pAsBupLEC8G5koSUNQOSuBJqyAJGLRnShQzWGp4kRxZKbKXrCMFaw4SCRTBMomARDJMIB5E9CGOJgtcx3J7Yn8wgdCluhGjogMi/FEIhmXBjdjdC3BRENy2Km6bRTRvvZrDyM+q6eXxw8xzk5oHOz5Opm0dsP58V3Hzo8fPpzc3HUD+fp90sDPhZ4fCzVONnzcnN4pmfVUA/y5mVm3XZys8Cs5+V8srNkv+Ek98uJpz8CDPh5NekGRc/ixFCCCHky2mb4TGO8cLkHuM4PoYGsGfph1r0Ih/rAWc2Oexz74DRE59PHre0GE8pvcoiykxnF2O96Ln3nNFGSqMs4ymlfIT9/1Qio/ADS6vojVe6gilMZUXrnFKbKfeeqiWUed5OXti4QgHTZ3THltxv9fnDaiFveOVKukfkTMRJmxr3yaakiM23ZLJ8cR2ZlBjoyKKksD8W1H1ipENdiWQ/QwflrYJidfAd1b2bQn3JMYrdiknCWlFLXSo/VqSgZRNDg8wo2STzPHgFlZnRPLAmNILLNGMtKGQus5K+J73Am5X0PckL9MYlZCW1mJin3oXEFAzikIk0l8BcSOKVAF1I2pVA1JCFlFpiffY9ch0wuXdGnoFVvnPqIf6JCaJd3CJtHQH69z3Sbh4ssuSxZX3ud2Q6oKrhjKwmwllEahI4i0hNAjJSbZGNV9anPkKiA64cTkhKIlijNSNptwCTlixtPawPfcRDIARoyl2RzLtuhACWEVkhcSPE+szHUAgaFIIGhaBBIWhQCBoUggaFoEEhaFAIGhSCBoWgQSFoUAgap8f9Ac1KQOtCVp1TAAAAAElFTkSuQmCC">
                    <!-- <router-link to="/login"> -->
                        <input @click="loginCondition" class="loginBtn" type="submit" value="회원가입">
                    <!-- </router-link> -->
                <!-- </form> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            label: ['이메일', '비밀번호', '비밀번호 재확인', '이름', '전화번호', '주소', '자기소개', '닉네임'],
            value: ['ex) user@naver.com', '비밀번호를 입력하세요 (필수)', '비밀번호를 한번 더 입력해주세요', '이름 (필수)', '전화번호 (필수)', '주소 (필수)', '자기소개', '닉네임'],
            type: ['email', 'password','password','text', 'tel', 'text', 'text', 'text']
        }
    },
    mounted(){
        const inputImage = document.querySelector('.file');
        inputImage.addEventListener('change', e => {
            this.profileImg(e.target)
        })
    },
    methods: {
        profileImg(input){
            // input 태그에 파일이 있는 경우.
            if(input.files && input.files[0]){
                // + 이미지 파일인지 검사해주기.
                const reader = new FileReader();
                // 이미지가 로드된 경우.
                reader.onload = e => {
                    const previewImage = document.querySelector('.priview');
                    previewImage.src = e.target.result;
                }
                // reader가 이미지 읽게 하기
                reader.readAsDataURL(input.files[0]);
            }
        },
            /* 
                1. id(email)가 DB에 있는 것과 동일해야 됨.
                2. 비밀번호가 동일해야 됨.
                3. 필수부분이 다 채워져야 됨.
            */
        loginCondition(){
            const inputs = document.querySelectorAll('.input');
            if(inputs[1].value !== inputs[2].value){
                alert('비밀번호가 다릅니다!');
                location.reload();
            }else if(inputs[0].value == "" || inputs[1].value == "" || inputs[3].value == "" || inputs[4].value == "" || inputs[5].value == ""){
                // 필수 input에 빈칸 유무
                alert('(필수) 부분이 비어있습니다!');
                location.reload();
            }else{
                // 회원 가입을 성공하면, 입력된 정보들을 DB에 저장시켜주기.
                alert('환영합니다 오운완 입니다!');
                location.replace('/'); 
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.container{
    position: absolute;
    margin: auto;
    top: 10%;
    left: 0;
    right: 0;
    width: 40vw;
    // border: 2px solid #333;
    border-radius: 10px;
    padding-bottom: 3%;
    .inner{
        width: 500px;
        color: #636363;
        p{
            font-size: 20px;
            font-weight: 700;
        }
        // .login{
            text-align: center;
            .labelName{
                // width: 100%;
                // padding-top: 10px;
                margin: 20px 0px 0px 100px;
                display: flex;
                // flex-direction: column;
            }
            input{
                font-size: 15px;
                width: 300px;
                height: 50px;
                border-radius: 10px;
                margin-top: 10px;
                border: 1px solid rgb(181, 181, 181);
                // border: 0;
                padding-left: 10px;
            }
            .loginBtn:hover{
                background-color: #6d84c9;
                color: #fff;
            }
            .sex{
                margin: 10px auto;
                width: 200px;
                display: flex;
                justify-content: space-between;
            }
            .fileBox{
                width: 350px;
                margin: auto;
                display: flex;
                justify-content: space-between;
                font-size: 13px;
                text-align: end;
                label{
                    margin-top: 12px;
                }
                .file{
                    width: 200px;
                    border: 0;
                }
            }
            .priview{
                border-radius: 10px;
                width: 300px;
            }
            .loginBtn{
                background-color: #93B5C6;
                color: #fcf3f3;
                font-weight: 900;
                box-sizing:content-box;
                border: 0px;
                transition: .3s;
                cursor: pointer;
            }
        // }
    }
}
</style>