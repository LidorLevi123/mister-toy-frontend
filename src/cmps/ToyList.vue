<template>
    <section class="toy-list">
        <ul class="clean-list">
            <li @click="goTo(`/toy/details/${toy._id}`)" v-for="toy in toys" :key="toy._id">
                <section class="actions">
                    <button @click="removeToy(toy)">x</button>
                </section>
                <ToyPreview :toy="toy"/>
            </li>
        </ul>
    </section>
</template>

<script>
import ToyPreview from '@/cmps/ToyPreview.vue'

export default {
    props: {
        toys: { type: Array, required: true }
    },

    methods: {
        removeToy(toy){
            this.$emit('remove', toy)
        },
        goTo(path) {
            this.$router.push(path)
        }
    },

    components: {
        ToyPreview,
    }
}
</script>