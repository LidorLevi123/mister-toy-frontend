<template>
    <section class="toy-index main-layout">
        <ToyList @remove="removeToy" :toys="toys"/>
    </section>
</template>

<script>
import { showSuccessMsg, showErrorMsg } from '@/services/event-bus.service'
import ToyList from '@/cmps/ToyList.vue'

export default {
    methods: {
        removeToy(toy) {
            this.$store.dispatch({ type: 'removeToy', toyId: toy._id })
                .then(()=> showSuccessMsg(`'${toy.name}' removed`))
                .catch(()=> showErrorMsg(`Could not remove '${toy.name}'`))
        }
    },
    computed: {
        toys() { return this.$store.getters.toys }
    },
    components: {
        ToyList,
    }
}
</script>