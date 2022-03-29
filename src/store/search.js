export const Search = {
    namespaced: true,
    state: () => ({test: 'test1'}),
    mutations: {
        testChange(state){
            state.test = 'changeTest1'
        }
    }
}