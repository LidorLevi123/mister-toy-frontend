<template>
    <section class="toy-index main-layout">
        <div class="actions">
            <ToyFilter @filter="setFilterBy"/>
            <button><RouterLink to="/toy/edit">Add Toy</RouterLink></button>
        </div>
        <ToyList @remove="removeToy" :toys="toys"/>
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
                .then(()=> showSuccessMsg(`'${toy.name}' removed`))
                .catch(()=> showErrorMsg(`Could not remove '${toy.name}'`))
        },
        setFilterBy(filterBy) {
            this.$store.commit({type: 'setFilterBy', filterBy: { ...filterBy }})
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