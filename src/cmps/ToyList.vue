<template>
    <section class="toy-list">
        <ul class="clean-list">
            <li v-for="toy in toys" :key="toy._id">
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
        }
    },

    components: {
        ToyPreview,
    }
}
</script>