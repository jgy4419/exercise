export const Search = {
    namespaced: true,
    state: () => ({
        searchValue: '',
        // 검색창에 input 값을 받으면 
        searchRes: '',
    }),
    mutations: {
        searchChange(state, {inputRes}){
            state.searchRes = inputRes;
        }
    },
    actions: {
        searchAction(context, payload){
            const {inputRes} = payload;
            context.searchRes = inputRes;
            context.commit('searchChange', {inputRes});
        }
    }
}