export const User = {
    namespaced: true,
    state: () => ({
        storeMail: '',
        storeUser_name: '',
        storeIntroduction: '',
        storePhoneNumber: '',
        storeAddress: '',
        storeSex: '',
        storeNickName: '',
        storeGrantion_level: 0,
    }),
    mutations: {    
        loginUser(state, {mail, grant}){
            state.storeMail = mail
            state.storeGrantion_level = grant
        }
    },
    actions: {
        loginUserAction(context, payload){
            const {mail, grant} = payload;
            context.storeMail = mail;
            context.storeGrantion_level = grant;
            context.commit('loginUser', {mail, grant});
        }
    }
}