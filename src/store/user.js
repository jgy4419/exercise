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
        storeGrantion_level: 1,
        expire: 0
    }),
    mutations: {    
        loginUser(state, {mail, grant, expire}){
            state.storeMail = mail
            state.storeGrantion_level = grant
            state.expire = expire
        }
    },
    actions: {
        loginUserAction(context, payload){
            const {mail, grant, expire} = payload;
            context.storeMail = mail;
            context.storeGrantion_level = grant;
            context.expire = expire;
            context.commit('loginUser', {mail, grant, expire});
        }
    }
}