import { createStore } from 'vuex'

import { toyStore } from './modules/toy'

const store = createStore({
    strict: true,

    modules: {
        toyStore
    }
})

export default store