import { toyService } from '../../services/toy.service.local.js'

export const toyStore = {
    strict: true,

    state() {
        return {
            toys: null,
            filterBy: null
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
        setFilterBy(state, { filterBy }) {
            state.filterBy = filterBy
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
        toys({ toys, filterBy }) {
            if (!filterBy) return toys

            // Filter
            const regex = new RegExp(filterBy.name, 'i')
            toys = toys.filter(toy => regex.test(toy.name))

            if (filterBy.inStock !== null) {
                toys = toys.filter(toy => toy.inStock === filterBy.inStock)
            }

            // Sort
            const desc = filterBy.isDescending ? -1 : 1
            const { sortBy } = filterBy

            if (sortBy === 'name') toys.sort((t1, t2) => t1.name.localeCompare(t2.name) * desc)
            else if (sortBy === 'price') toys.sort((t1, t2) => (t1.price - t2.price) * desc)
            else if (sortBy === 'createdAt') toys.sort((t1, t2) => (t1.createdAt - t2.createdAt) * desc)

            return toys
        }
    },
}