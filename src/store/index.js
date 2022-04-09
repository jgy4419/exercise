import {createStore} from 'vuex';
import {Search} from './search'
import {Community} from './community'

export default createStore({
    modules: {Search, Community}
})