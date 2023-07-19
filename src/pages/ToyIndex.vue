<template>
    <section class="toy-index main-layout">
        <div class="actions">
            <ToyFilter @filter="setFilterBy" />
            <button class="cssbuttons-io-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path>
                </svg>
                <span>
                    <RouterLink to="/toy/edit">Add Toy</RouterLink>
                </span>
            </button>
        </div>
        <ToyList @remove="removeToy" :toys="toys" />
    </section>
</template>

<script>
import { showSuccessMsg, showErrorMsg } from '@/services/event-bus.service'
import ToyList from '@/cmps/ToyList.vue'
import ToyFilter from '@/cmps/ToyFilter.vue'

export default {
    methods: {
        removeToy(toy) {
            this.$store.dispatch({ type: 'removeToy', toyId: toy._id })
                .then(() => showSuccessMsg(`'${toy.name}' removed`))
                .catch(() => showErrorMsg(`Could not remove '${toy.name}'`))
        },
        setFilterBy(filterBy) {
            this.$store.commit({ type: 'setFilterBy', filterBy: { ...filterBy } })
        }
    },
    computed: {
        toys() { return this.$store.getters.toys }
    },
    components: {
        ToyList,
        ToyFilter
    }
}
</script>