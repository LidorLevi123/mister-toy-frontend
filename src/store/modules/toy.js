import { toyService } from '@/services/toy.service.js'

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
        },
        removeToy({ toys }, { toyId }) {
            const idx = toys.findIndex(toy => toy._id === toyId)
            toys.splice(idx, 1)
        },
        addToy({ toys }, { toyToSave }) {
            toys.unshift(toyToSave)
        },
        updateToy({ toys }, { toyToSave }) {
            const idx = toys.findIndex(toy => toy._id === toyToSave._id)
            toys.splice(idx, 1, toyToSave)
        },
    },

    actions: {
        loadToys({ commit }, { filterBy }) {
            return toyService.query(filterBy)
                .then(toys => {
                    commit({ type: 'setToys', toys })
                })
                .catch(err => {
                    console.log(err)
                    return Promise.reject()
                })
        },
        removeToy({ commit }, payload) {
            return toyService.remove(payload.toyId)
                .then(() => commit(payload))
                .catch(err => {
                    console.log(err)
                    return Promise.reject()
                })
        },
        saveToy({ commit }, { toyToSave }) {
            const type = toyToSave._id ? 'updateToy' : 'addToy'
            return toyService.save(toyToSave)
                .then(toy => commit({ type, toyToSave: toy }))
                .catch(err => {
                    console.log(err)
                    return Promise.reject()
                })
        }
    },

    getters: {
        toys({ toys }) { return toys }
    },
}