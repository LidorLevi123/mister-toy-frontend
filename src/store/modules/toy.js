import { toyService } from '../../services/toy.service.local.js'

export const toyStore = {
    strict: true,

    state() {
        return {
            toys: null,
        }
    },

    mutations: {
        setToys(state, { toys }) {
            state.toys = toys
            console.log(state.toys);
        },
        removeToy({ toys }, { toyId }) {
            const idx = toys.findIndex(toy => toy._id === toyId)
            toys.splice(idx, 1)
        },
        addToy({ toys }, toy) {
            toys.unshift(toy)
        }
    },

    actions: {
        loadToys({ commit }) {
            return toyService.query()
                .then(toys => commit({ type: 'setToys', toys }))
                .catch(err => {
                    console.log(err)
                    return Promise.reject()
                })
        },
    },

    getters: {

    },
}